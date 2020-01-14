const router = require("express").Router();

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

// @route GET api/items/fields/:field_name
// @desc  GET All Items with a specific field
// @access Private
// router.get("/fields/:field_name", auth, async (req, res) => {
//   try {
//     const items = await Item.find({
//       field_of_study: req.params.field_name
//     }).sort({ date: -1 });
//     res.json(items);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

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

// @route GET api/fields/user/:user_id
// @desc  GET All fields of study a user studies in
// @access Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });

    let fieldArray = [];

    profile.metadata.item_count.map(async item => {
      await Item.findById(item._id).then(async result => {
        await fieldArray.unshift(result.field_of_study);
      });
      let newFieldArray = [];
      fieldArray.map(async field => {
        await Field.findById(field)
          .sort({ name: 1 })
          .then(async result => {
            await newFieldArray.unshift(result);
          });

        if (fieldArray.length === newFieldArray.length) {
          await res.json(newFieldArray);
        }
      });
    });

    if (profile.field_count !== undefined) {
      await Item.find({ user: profile.user._id })
        .sort({ name: 1 })
        .then(async items => {
          items.map(async item => {
            await Field.findById(item.field_of_study._id).then(async result => {
              await fieldArray.unshift(result);
            });
          });
          for (let i = fieldArray - 1; i > 0; i--) {
            if (i === 1) {
              await res.json(fieldArray);
            }
          }
        });
    }
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

    await Profile.findOne({ user: req.user.user.id }).then(async res => {
      await Field.findById(field._id).then(res2 => {
        res.metadata.field_count.unshift(res2);

        res.save();
      });
    });

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

    await Profile.findOne({ user: req.user.user.id }).then(async result => {
      await result.metadata.field_count.filter(userField => {
        if (userField._id.toString() === field._id.toString()) {
          const removeIndex = result.metadata.field_count
            .map(field => field.id)
            .indexOf(req.params.field_id);

          result.metadata.field_count.splice(removeIndex, 1);

          result.save();
        }
      });
    });

    await field.remove();

    res.json({ msg: "Field of Study removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
