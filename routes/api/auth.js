const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route     POST api/auth
// @desc      Authenticate the user
// @access    Public
router.post(
  "/",
  [
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

    const { email, password } = req.body;

    try {
      // See if the user already exist if not create a new one
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }

      // Validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     GET api/auth/user
// @desc      Get user data
// @access    Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
