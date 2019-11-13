const router = require("express").Router();

// Item Model
const Log = require("../../models/LogEntry");

// @route GET api/logs
// @desc  GET All Logs for an Item
// @access Public
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/logs/
// @desc  Create a Log
// @access Public
router.post("/", async (req, res) => {
  try {
    const newEntry = new Item({
      name: req.body.name,
      entry: req.body.entry
    });

    const log = await newEntry.save();

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/logs/:id
// @desc  Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  Log.findById(req.params.id)
    .then(log => log.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
});

module.exports = router;
