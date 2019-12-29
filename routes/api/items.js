const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

// Models
const Item = require("../../models/Item");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Field = require("../../models/FIeld");

// @route GET api/items
// @desc  GET All Items
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find()
      .sort({ date: -1 })
      .populate("field_of_study", ["name"], Field);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/items/name/:item_name
// @desc  GET All Items with a specific name
// @access Private
router.get("/name/:item_name", auth, async (req, res) => {
  try {
    const namedItems = await Item.find({ name: req.params.item_name })
      .sort({
        date: -1
      })
      .populate("field_of_study", ["name"], Field);

    res.json(namedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/items/field/:field_id
// @desc  GET All Items with a specific field
// @access Private
router.get("/field/:field_id", auth, async (req, res) => {
  try {
    const fieldItems = await Item.find({
      field_of_study: { _id: req.params.field_id }
    })
      .sort({
        date: -1
      })
      .populate("field_of_study", ["name"], Field);
    // console.log(fieldItems);
    res.json(fieldItems);
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
    const item = await Item.findById(req.params.id).populate(
      "field_of_study",
      ["name"],
      Field
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/items/
// @desc  Create or Edit an Item and also add it to the user's item_count
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Title is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let item = null;
    let { name, field_of_study, difficulty, material, status, _id } = req.body;

    const field = await Field.findById(field_of_study);
    const user = await User.findById(req.user.user.id);

    await Profile.findOne({ user: req.user.user.id })
      .then(async result => {
        if (_id === undefined) {
          const newItem = new Item({
            user: user._id,
            username: user.name,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            field_of_study: field,
            difficulty: difficulty,
            status: status,
            material:
              material !== undefined
                ? material.split(",").map(mat => mat.trim())
                : material
          });

          item = await newItem.save();

          await Item.findById(item._id).then(res => {
            result.metadata.item_count.unshift(res);

            result.save();
          });
        } else {
          // Build item object
          const itemFields = {};
          itemFields.user = req.user.user.id;
          if (name) itemFields.name = name;
          if (difficulty) itemFields.difficulty = difficulty;
          if (status) itemFields.status = status;
          if (material) {
            itemFields.material =
              material.length > 0
                ? material.split(",").map(mat => mat.trim())
                : material;
          }

          item = await Item.findOneAndUpdate(
            { _id: _id },
            { $set: itemFields },
            { new: false, upsert: true }
          );
        }
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send("Server Error");
      });

    await res.json(item);
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

    await Chapter.find({ item: item_id }).then(async res => {
      await Document.find({ chapter: res._id }).then(res2 => {
        res2.remove();
      });

      await res.remove();
    });

    await Profile.findOne({ user: req.user.user.id }).then(async result => {
      await result.metadata.item_count.filter(userItem => {
        if (userItem._id.toString() === item._id.toString()) {
          const removeIndex = result.metadata.item_count
            .map(item => item.id)
            .indexOf(req.params.item_id);

          result.metadata.item_count.splice(removeIndex, 1);

          result.save();
        }
      });
    });

    await item.remove();

    res.json({ msg: "Study Item removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// // @route GET api/items/user/:id
// // @desc  GET All Items from a user
// // @access Private
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.user.id).select("-password");
    const items = await Item.find({ user: user._id }).sort({
      date: -1
    });
    console.log(items);
    const newItems = [];
    items.filter(item => {
      // Check user
      if (item.user.toString() !== user._id) {
        newItems.push(item);
      }
    });

    res.json(newItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
