const passport = require("passport");
const Strategy = require("passport-local");

const User = require("../models/userModel");
const comparePassword = require("../utils/hash").comparePassword;

passport.serializeUser((user, done) => {
  done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});

module.exports = passport.use(
  new Strategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };

        if (!comparePassword(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch(err) {
        return done(err);
      };
  })
);

