const router = require("express").Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc  GET All Items
// @access Public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /:id
// @desc  GET One Items
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/items
// @desc  Create an Item
// @access Public
router.post("/", async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      field_of_study: req.body.field_of_study,
      difficulty: req.body.difficulty,
      material: req.body.material,
      comments: req.body.comments,
      status: req.body.status
    });

    const item = await newItem.save();

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/items/:id
// @desc      Update item
// @access    Public
router.put("/:id", async (req, res) => {
  const {
    name,
    field_of_study,
    difficulty,
    material,
    comments,
    status
  } = req.body;

  // Build item object
  const itemFields = {};
  if (name) itemFields.name = name;
  if (field_of_study) itemFields.field_of_study = field_of_study;
  if (difficulty) itemFields.difficulty = difficulty;
  if (material) itemFields.material = material;
  if (comments) itemFields.comments = comments;
  if (status) itemFields.status = status;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "item not found" });

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/items/:id
// @desc  Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
});

module.exports = router;
