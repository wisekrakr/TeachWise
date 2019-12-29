const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const User = require("../../models/User");
const Chapter = require("../../models/itemdocumentation/Chapter");
const Document = require("../../models/itemdocumentation/Document");

// @route GET api/docs
// @desc  GET All Documents from a user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user.user.id })
      .sort({ date: -1 })
      .populate("chapter", ["title"], Chapter);
    res.json(docs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/documents/:id
// @desc  GET One Document
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate(
      "chapter",
      ["title"],
      Chapter
    );

    res.json(doc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // @route GET api/documents/:chapter_id/documents
// // @desc  GET All documents from one chapter
// // @access Private
router.get("/:chapter_id/documents", auth, async (req, res) => {
  try {
    const docs = await Document.find({ chapter: req.params.chapter_id }).sort({
      date: -1
    });

    // console.log("in documents.js get /:chapter_id " + req.params.chapter_id);

    res.json(docs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/documents/:item_id
// @desc  Create or Edit a Document and also add it to the user's documents
// @access Private
router.post(
  "/:item_id",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("info", "Info is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let doc = null;
    let { _id, title, info, description, chapter } = req.body;

    const user = await User.findById(req.user.user.id);

    await Item.findById(req.params.item_id)
      .then(async result => {
        if (_id === undefined) {
          const newDoc = new Document({
            user: user._id,
            chapter: chapter,
            title: title.charAt(0).toUpperCase() + title.slice(1),
            info: info,
            description: description
          });

          doc = await newDoc.save();

          await Document.findById(doc._id).then(res => {
            result.documentation.documents.unshift(res);

            result.save();
          });
        } else {
          // Build document object
          const docFields = {};
          docFields.user = req.user.user.id;
          if (title) docFields.title = title;
          if (description) docFields.description = description;
          if (info) docFields.info = info;
          if (chapter) docFields.chapter._id = chapter._id;

          console.log("docfields " + docfield);
          doc = await Document.findOneAndUpdate(
            { _id: _id },
            { $set: docFields },
            { new: false, upsert: true }
          );
        }
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send("Server Error");
      });

    await res.json(doc);
  }
);

// @route DELETE api/documents/:id
// @desc  Delete a Document
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    // Check user
    if (document.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const chapter = await Chapter.findById(document.chapter).populate(
      "chapter",
      ["item"],
      Chapter
    );

    await Item.findById(chapter.item).then(async result => {
      await result.documentation.documents.filter(doc => {
        if (doc.toString() === document._id.toString()) {
          const removeIndex = result.documentation.documents
            .map(d => d.id)
            .indexOf(req.params.id);

          result.documentation.documents.splice(removeIndex, 1);

          result.save();
        }
      });
    });

    await document.remove();

    res.json({ msg: "Document removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
