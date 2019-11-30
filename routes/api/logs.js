const router = require("express").Router();
const { check } = require("express-validator");

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
  [
    auth,
    [
      check("name", "Title is required")
        .not()
        .isEmpty(),
      check("entry", "An entry is required")
        .not()
        .isEmpty()
    ]
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
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !log) {
      return res.status(404).json({ msg: "Log Entry not found" });
    }

    // Check user
    if (log.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await log.remove();

    res.json({ msg: "Log Entry removed", deleted: true });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
