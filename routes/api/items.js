const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route GET api/items
// @desc  GET All Items
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/items/:id
// @desc  GET One Item
// @access Private
router.get("/:id", auth, async (req, res) => {
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
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Title is required")
        .not()
        .isEmpty(),
      check("field_of_study", "Field of Study is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, field_of_study, difficulty, material, status } = req.body;

    // Build item object
    const itemFields = {};

    const user = await User.findById(req.user.user.id).select("-password");

    itemFields.user = req.user.user.id;
    itemFields.username = user.name;
    if (name) itemFields.name = name;
    if (field_of_study) itemFields.field_of_study = field_of_study;
    if (difficulty) itemFields.difficulty = difficulty;
    if (status) itemFields.status = status;
    if (material) {
      itemFields.material =
        material.length > 1
          ? material.split(",").map(mat => mat.trim())
          : material;
    }

    try {
      let item = await Item.findOneAndUpdate(
        { user: req.user.user.id },
        { $set: itemFields },
        { new: false, upsert: true }
      );

      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/items/:id
// @desc  Delete an Item
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !item) {
      return res.status(404).json({ msg: "Study Item not found" });
    }

    // Check user
    if (item.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await item.remove();

    res.json({ msg: "Study Item removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// TODO THIS WORKS BUT WHAT IF AN USER MAKES TWO ITEMS WITH THE SAME NAME?
// CREATES A NULL OBJECT ==> DUPLICATES NOT PERMITTED AS ITEMS BUT PERMITTED IN ITEM_COUNT

// @route POST api/items/user/:id/:item_name
// @desc  POST to Item_count from a user
// @access Private
router.post("/user/:id/:item_name", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.user.id).select("-password");

    const item = await Item.findOne({ name: req.params.item_name });

    user.metadata.item_count.unshift(item);

    await user.save();

    res.json(user.metadata.item_count);
  } catch (err) {
    console.error(err.message + " in items.js (POST) /user/:id/:item_name");
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/items/user/:id/:item_id
// @desc  Delete an Item from Item_count from user
// @access Private
router.delete("/user/:id/:item_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Pull out the item
    user.metadata.item_count.filter(userItem => {
      if (userItem._id.toString() === req.params.item_id.toString()) {
        const removeIndex = user.metadata.item_count
          .map(item => item.id)
          .indexOf(req.params.item_id);

        user.metadata.item_count.splice(removeIndex, 1);

        user.save();

        res.json(user.metadata.item_count);
      } else {
        console.error("item not found in items.js DELETE user/:id/:item_id");
        return res.status(404).json({ msg: "Item does not exist" });
      }
    });

    // If the item does not exist
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// // @route GET api/items/user/:id
// // @desc  GET All Items from a user
// // @access Private
// router.get("/user/:id", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.user.id).select("-password");
//     const items = await Item.find({ user: user._id }).sort({
//       date: -1
//     });
//     console.log(items);
//     const newItems = [];
//     items.filter(item => {
//       // Check user
//       if (item.user.toString() !== user._id) {
//         newItems.push(item);
//       }
//     });

//     res.json(newItems);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route    POST api/items/user_comments/:id
// @desc     Add user item comment
// @access   Private
router.post(
  "/user_comments/:id",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("comment", "A comment is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.user.id).select("-password");
      const item = await Item.findById(req.params.id);
      const profile = await Profile.findOne({ user: req.user.user.id });

      const newComment = {
        comment: req.body.comment,
        title: req.body.title,
        user: req.user.user.id,
        avatar:
          profile.avatar === null
            ? "https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/dd_logo_solo.png"
            : profile.avatar,
        name: user.name
      };

      item.user_comments.unshift(newComment);

      await item.save();

      res.json(item.user_comments);
    } catch (err) {
      console.error(err.message + " in items.js (POST) /user_comments/:id");
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/items/user_comments/:id/:comment_id
// @desc     Delete user comment from item
// @access   Private
router.delete("/user_comments/:id/:comment_id", auth, async (req, res) => {
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

    // if (comment.user.toString() !== item.user.toString()  ) {
    //   return res.status(401).json({ msg: "User not authorized" });
    // }

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

// @route    PUT api/items/like/:id
// @desc     Like an item
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    item.likes.filter(like => {
      console.log(like.user.toString() + " " + item.user);
    });

    // Check if the item has already been liked
    if (
      item.likes.filter(like => like.user.toString() === req.user.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Item already liked" });
    }

    item.likes.unshift({ user: item.user });

    await item.save();

    res.json(item.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/items/unlike/:id
// @desc     Unlike an item
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    // Check if the item has already been liked
    if (
      item.likes.filter(like => like.user.toString() === req.user.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = item.likes
      .map(like => like.user.toString())
      .indexOf(item.user);

    item.likes.splice(removeIndex, 1);

    await item.save();

    res.json(item.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
