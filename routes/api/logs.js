const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

// Log Model
const Log = require("../../models/LogEntry");

// @route GET api/logs
// @desc  GET All Logs for a Log
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /:id
// @desc  GET One Log
// @access Public
router.get("/:id", auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/logs/
// @desc  Create a Log
// @access Public
router.post(
  "/",
  [auth],
  [
    check("name", "Title is required")
      .not()
      .isEmpty(),
    check("entry", "An entry is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const newEntry = new Log({
        name: req.body.name,
        entry: req.body.entry,
        topic: req.body.topic,
        user: req.user.user.id
      });

      const log = await newEntry.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/logs/:id
// @desc  Delete a Log
// @access Public
router.delete("/:id", auth, (req, res) => {
  Log.findById(req.params.id)
    .then(log => log.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
});

module.exports = router;
