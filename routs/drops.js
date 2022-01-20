const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Drops = require('../models/Drop');
const User = require('../models/User')

// @route     GET api/drops
// @desc      Get all users drops
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const drops = await Drops.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(drops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/drops
// @desc      Add new drops
// @access    Private
router.post(
  '/',
  auth,
  check('file', 'A document is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, file, location } = req.body;

    try {
      const newDrop = new Drops({
        title,
        file,
        location,
        user: req.user.id
      });

      const drop = await newDrop.save();

      res.json(drop);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route     DELETE api/contacts/:id
// @desc      Delete drop
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let drop = await Drops.findById(req.params.id);
    console.log(drop.user)
    if (!drop) return res.status(404).json({ msg: 'Drop not found' });

    // Make sure user owns contact
    if (drop.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Drops.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Drop removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;