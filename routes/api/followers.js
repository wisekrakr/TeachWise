const router = require("express").Router();
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/followers/:user_id
// @desc  GET All followers from a user
// @access Private
router.get("/followers/:user_id", auth, async (req, res) => {
  try {
    const followers = await Profile.findById(req.params.id).sort({ date: -1 });
    res.json(followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/followers/:user_id/followers/:follow_id
// @desc  Set a follower
// @access Private
router.post("/:user_id/followers/:follow_id", [auth], async (req, res) => {
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
});

// @route DELETE api/followers/:user_id/followers/:follow_id
// @desc  Delete a Log
// @access Private
router.delete("/:user_id/followers/:follow_id", auth, async (req, res) => {
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

module.exports = router;
