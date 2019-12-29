const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
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

    res.json({ msg: "Log Entry removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route POST api/logs/user/:id/:log_name
// @desc  POST to log_count from a user
// @access Private
router.post("/user/:id/:log_name", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ user: req.user.user.id });

    const log = await Log.findOne({ name: req.params.log_name });

    profile.metadata.log_count.unshift(log);

    await profile.save();

    res.json(profile.metadata.log_count);
  } catch (err) {
    console.error(err.message + " in logs.js (POST) /user/:id/:log_name");
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/logs/user/:id/:log_id
// @desc  Delete an Log Entry from log_count from user
// @access Private
router.delete("/user/:id/:log_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });

    // Pull out the log
    profile.metadata.log_count.filter(userLog => {
      if (userLog._id.toString() === req.params.log_id.toString()) {
        const removeIndex = profile.metadata.log_count
          .map(log => log.id)
          .indexOf(req.params.log_id);

        profile.metadata.log_count.splice(removeIndex, 1);

        profile.save();

        res.json(profile.metadata.log_count);
      } else {
        console.error("log not found in logs.js DELETE user/:id/:log_id");
        return res.status(404).json({ msg: "Log Entry does not exist" });
      }
    });

    // If the field does not exist
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
