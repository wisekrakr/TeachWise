const router = require("express").Router();
const { validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Field = require("../../models/FIeld");

// @route GET api/fields
// @desc  GET All FIelds of Study
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const fields = await Field.find().sort({ date: -1 });
    res.json(fields);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /fields/:id
// @desc  GET One Field of study
// @access Public
router.get("/:id", auth, async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    res.json(field);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/fields
// @desc  Create a field of study
// @access Public
router.post("/", auth, async (req, res) => {
  try {
    const fields = await Field.find();
    let numbersArray = [];
    const rando = Math.round(Math.random() * 25000);

    for (let field in fields) {
      numbersArray.push(field.number);
    }

    const newEntry = new Field({
      name: req.body.name,
      user: req.user.user.id,
      number: !numbersArray.includes(rando) ? rando : fields.length
    });

    const field = await newEntry.save();

    res.json(field);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/fields/:id
// @desc  Delete a Study Field
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !field) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (field.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await field.remove();

    res.json({ msg: "Field of Study removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route POST api/fields/user/:id/:field_name
// @desc  POST to Field_count from a user
// @access Private
router.post("/user/:id/:field_name", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.user.id).select("-password");

    const field = await Field.findOne({ name: req.params.field_name });

    user.metadata.field_count.unshift(field);

    await user.save();

    res.json(user.metadata.field_count);
  } catch (err) {
    console.error(err.message + " in fields.js (POST) /user/:id/:field_name");
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/fields/user/:id/:field_id
// @desc  Delete an Field from Field_count from user
// @access Private
router.delete("/user/:id/:field_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Pull out the item
    user.metadata.field_count.filter(userField => {
      if (userField._id.toString() === req.params.field_id.toString()) {
        const removeIndex = user.metadata.field_count
          .map(field => field.id)
          .indexOf(req.params.field_id);

        user.metadata.field_count.splice(removeIndex, 1);

        user.save();

        res.json(user.metadata.field_count);
      } else {
        console.error("item not found in fields.js DELETE user/:id/:field_id");
        return res.status(404).json({ msg: "Field does not exist" });
      }
    });

    // If the field does not exist
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
