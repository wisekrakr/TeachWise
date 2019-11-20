const router = require("express").Router();

const Field = require("../../models/Field");

// @route GET api/fields
// @desc  GET All FIelds of Study
// @access Public
router.get("/fields", async (req, res) => {
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
router.get("/fields/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  try {
    const newEntry = new Field({
      name: req.body.name,
      sub_topic: req.body.sub_topic
    });

    const field = await newEntry.save();

    res.json(field);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
