const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Item = require("../../models/Item");
const Field = require("../../models/FIeld");
const Log = require("../../models/LogEntry");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.user.id
    }).populate("user", ["name", "avatar", "email"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message + " in profile.js (GET) /me");
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      avatar,
      website,
      location,
      bio,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.user.id;
    avatar
      ? (profileFields.avatar = avatar)
      : (profileFields.avatar =
          "https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/dd_logo_solo.png");

    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    profileFields.metadata = { item_count: [], field_count: [], log_count: [] };

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.user.id },
        { $set: profileFields },
        { new: false, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message + " in profile.js (POST) /");
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "user",
      ["name", "metadata"],
      User
    );

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/:id
// @desc     Get profile by ID
// @access   Public
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "metadata", "email"], User);

    // console.log(profile + " " + req.params.id);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// // @route    DELETE api/profile/:id
// // @desc     Delete profile, user & items
// // @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Remove user study fields
    await Field.deleteMany({ user: req.user.user.id });
    // Remove user log entries
    await Log.deleteMany({ user: req.user.user.id });
    // Remove user posts
    await Item.deleteMany({ user: req.user.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("field_of_study", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      field_of_study,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      field_of_study,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.user.id });
    const eduIds = foundProfile.education.map(edu => edu._id.toString());
    const removeIndex = eduIds.indexOf(req.params.edu_id);

    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      foundProfile.education.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// // @route    PUT api/profile/follow/:id
// // @desc     Follow a profile
// // @access   Private
router.put("/follow/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).then(result => {
      if (
        result.connection.followers.filter(
          follow => follow.profile.toString() === req.user.user.id
        ).length > 0
      ) {
        return res.status(400).json({ msg: "User already followed" });
      }
      result.connection.followers.unshift({ profile: req.user.user.id });

      result.save();

      Profile.findOne({ user: req.user.user.id })
        .then(result2 => {
          console.log(result2);
          result2.connection.following.unshift({ profile: req.params.id });

          result2.save();

          res.json(result2.connection.following);
        })
        .catch(err => {
          console.error(err.message);
          res.status(500).send("Server Error");
        });
    });

    await res.json(profile.connection.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  // const profile = await Profile.findById(req.params.id);
  // const myProfile = await Profile.findOne({ user: req.user.user.id });

  // // Check if the item has already been liked
  // if (
  //   profile.connection.followers.filter(
  //     follow => follow.profile.toString() === req.user.user.id
  //   ).length > 0
  // ) {
  //   return res.status(400).json({ msg: "User already followed" });
  // }

  // profile.connection.followers.unshift({ profile: req.user.user.id });
  // profile.connection.following.unshift({ profile: req.params.id });

  // await profile.save();
  // await myProfile.save();

  // res.json(profile.connection.followers);
});

// // @route    PUT api/profile/unfollow/:id
// // @desc     Unfollow a profile
// // @access   Private
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).then(result => {
      if (
        result.connection.followers.filter(
          follow => follow.profile.toString() === req.user.user.id
        ).length === 0
      ) {
        return res.status(400).json({ msg: "User is not yet followed" });
      }
      const removeIndex = result.connection.followers
        .map(follow => follow.profile.toString())
        .indexOf(req.params.id);

      result.connection.followers.splice(removeIndex, 1);

      result.save();

      Profile.findOne({ user: req.user.user.id }).then(result2 => {
        const removeIndex = result2.connection.following
          .map(follow => follow.profile.toString())
          .indexOf(req.params.id);

        result2.connection.following.splice(removeIndex, 1);

        result2.save();

        res.json(result2.connection.following);
      });
    });

    await res.json(profile.connection.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
