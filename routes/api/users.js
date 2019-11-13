const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require('config');
const { validationResult, check } = require("express-validator");

const User = require("../../models/User");

// @route     POST api/users
// @desc      Register a new user
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user already exist if not create a new one
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      //   Create a new User
      user = new User({
        name,
        email,
        password
      });

      //   Create a password hash
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
      res.json(payload);

      //   jwt.sign(
      //     payload,
      //     config.get('jwtSecret'),
      //     {
      //       expiresIn: 360000
      //     },
      //     (err, token) => {
      //       if (err) throw err;
      //       res.json({ token });
      //     }
      //   );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
