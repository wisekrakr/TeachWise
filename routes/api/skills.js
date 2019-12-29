const router = require("express").Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Skill = require("../../models/Skill");
const Profile = require("../../models/Profile");

// @route GET api/skills
// @desc  GET All Skills
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /skills/:id
// @desc  GET One Skill
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/skills
// @desc  Create a skill
// @access Private
router.post("/", auth, async (req, res) => {
  try {
    const newSkill = new Skill({
      name: req.body.name,
      user: req.user.user.id
    });

    const skill = await newSkill.save();

    await Profile.findById(req.user.user.id).then(async res => {
      await Skill.findById(skill._id).then(res2 => {
        res.skills.unshift(res2);

        res.save();
      });
    });

    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/skills/:id
// @desc  Delete a Study Skill
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !skill) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (skill.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Profile.findById(req.user.user.id).then(async res => {
      const profile = res;
      await profile.skills.filter(userSkill => {
        if (userSkill._id.toString() === skill._id.toString()) {
          const removeIndex = profile.skills
            .map(skill => skill.id)
            .indexOf(req.params.skill_id);

          profile.skills.splice(removeIndex, 1);

          profile.save();
        }
      });
    });

    await skill.remove();

    res.json({ msg: "Skill of Study removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
