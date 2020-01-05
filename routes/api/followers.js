const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/:user_id/followers
// @desc  GET All followers from a user
// @access Private
router.get("/profile/:user_id/followers", auth, async (req, res) => {
  try {
    const followers = await Profile.findById(req.params.id).sort({ date: -1 });
    res.json(followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile/:user_id/followers
// @desc  Set a follower
// @access Private
router.post(
  "/profile/:user_id/followers/:follow_id",
  [auth],
  async (req, res) => {
    try {
      const follower = await Profile.findById(req.params.follow_id);

      await Profile.findById(req.params.user_id).then(result => {
        result.connection.followers.unshift(follower);

        result.save();
      });
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
