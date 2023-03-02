const express = require("express");
const User = require("../models/userModel");

const router = express.Router();
const authUser = require("../middleware/auth");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmailAndPassword(email, password);
    if (!user) {
      return next(user);
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", authUser, async (req, res, next) => {
  if (req.user.token === "") return next("NoToken");
  req.user.token = "";

  try {
    await req.user.save();

    res.send("user logged out");
  } catch (err) {
    next(err);
  }
});

//TODO check real auth systems
// router.get("/updateToken", auth, async (req, res, next) => {
//   try {
//     const token = await req.user.generateAuthToken();
//     req.user.tokens = req.user.tokens.filter(
//       (tokenDoc) => tokenDoc.token !== req.token
//     );
//     res.send(token);
//   } catch (error) {
//     next(err);
//   }
// });

module.exports = router;
