const router = require("express").Router();

const auth = require("../../middleware/auth");
const Field = require("../../models/Field");

// @route GET api/fields
// @desc  GET All FIelds of Study
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const fields = await Field.find();
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

// @route POST api/fields/
// @desc  Create a field of study
// @access Public
router.post("/", auth, async (req, res) => {
  try {
    const newEntry = new Field({
      name: req.body.name,
      user: req.user.user.id
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

    res.json({ msg: "Field of Study removed", deleted: true });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
