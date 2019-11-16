const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const User = require("../../models/User");

// @route GET api/items
// @desc  GET All Items
// @access Public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /:id
// @desc  GET One Items
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/items
// @desc  Create an Item
// @access Public
router.post(
  "/",

  [
    check("name", "Title is required")
      .not()
      .isEmpty(),
    check("field_of_study", "A Field of Study is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');

      const newItem = new Item({
        // user: req.user.id,
        user: "5dcdf4c0ff04923f388cc5de",
        name: req.body.name,
        field_of_study: req.body.field_of_study,
        difficulty: req.body.difficulty,
        material: req.body.material,
        status: req.body.status
      });

      const item = await newItem.save();

      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/items/:id
// @desc  Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
});

// @route    POST api/items/user_comments/:id
// @desc     Add user item comment
// @access   Public
router.post(
  "/user_comments/:id",

  [
    (check("title", "Title is required")
      .not()
      .isEmpty(),
    check("comment", "A comment is required")
      .not()
      .isEmpty())
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');

      const item = await Item.findById(req.params.id);

      const newComment = {
        comment: req.body.comment,
        title: req.body.title,
        // user: req.user.id
        user: "5dcdf4c0ff04923f388cc5de"
      };

      item.user_comments.unshift(newComment);

      await item.save();

      res.json(item.user_comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/items/user_comments/:id/:comment_id
// @desc     Delete user comment from item
// @access   Public
router.delete("/user_comments/:id/:comment_id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    // Pull out the comment
    const comment = item.user_comments.find(
      comment => comment.id === req.params.comment_id
    );

    // If the comment does not exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check for the user
    if (comment.user.toString() !== item.user.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removeIndex = item.user_comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    item.user_comments.splice(removeIndex, 1);

    await item.save();

    res.json(item.user_comments);
  } catch (err) {
    console.error(err.message + " in  items.js");
    res.status(500).send("Server Error");
  }
});

module.exports = router;
