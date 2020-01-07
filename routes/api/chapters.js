const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const User = require("../../models/User");
const Chapter = require("../../models/itemdocumentation/Chapter");
const Document = require("../../models/itemdocumentation/Document");

// @route GET api/chapters
// @desc  GET All Chapters from a user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const chapters = await Chapter.find({ user: req.user.user.id }).sort({
      date: 1
    });

    res.json(chapters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/chapters/:id
// @desc  GET One Chapter
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);

    res.json(chapter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // @route GET api/chapters/:item_id/chapters
// // @desc  GET All chapters from one item
// // @access Private
router.get("/:item_id/chapters", auth, async (req, res) => {
  try {
    const chapters = await Chapter.find({ item: req.params.item_id })
      .populate("documents", ["user", "title", "description"], Document)
      .populate("items", ["user", "name"], Item)
      .sort({
        date: 1
      });

    // console.log("in chapters.js get /:item_id " + chapters);

    res.json(chapters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/chapters/:item_id
// @desc     Add chapter
// @access   Private
router.post(
  "/:item_id",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("description", "A Short Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let chapter = null;
    const user = await User.findById(req.user.user.id);

    await Item.findById(req.params.item_id)
      .then(async result => {
        const newEntry = new Chapter({
          user: user._id,
          item: result._id,
          documents: [],
          title: req.body.title,
          description: req.body.description
        });
        chapter = await newEntry.save();

        await Chapter.findById(chapter._id).then(res => {
          result.documentation.chapters.unshift(res);

          result.save();
        });
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send("Server Error");
      });
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !chapter) {
      return res.status(404).json({ msg: "Chapter not found" });
    }

    // Check user
    if (chapter.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Item.findById(chapter.item).then(async result => {
      await result.documentation.chapters.filter(cha => {
        if (cha.toString() === chapter._id.toString()) {
          const removeIndex = result.documentation.chapters
            .map(c => c.id)
            .indexOf(req.params.id);

          result.documentation.chapters.splice(removeIndex, 1);

          result.save();
        }
      });
    });

    await chapter.remove();

    res.json({ msg: "Chapter removed" });
  } catch (err) {
    console.error("DELETE chapters.js " + err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
