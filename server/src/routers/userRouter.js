const express = require("express");
const User = require("../models/userModel");

const router = express.Router();
const authUser = require("../middleware/auth");
const verifyProfessor = require("../middleware/verifyProfessor");

const FILTERS = ["token", "courses"];
// const {
//   verifyRequestFields,
// } = require("../middleware/modelFieldsVarifiers.js");
////
router.post("/user/login", async (req, res, next) => {
  console.log("LOG student");

  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmailAndPassword(email, password);
    if (!user) {
      return next(user);
    }
    console.log(user);
    const token = await user.generateAuthToken();
    //res.cookie("userToken", token);
    console.log(token);
    res.send({ user, token });
  } catch (err) {
    next(err);
  }
});
//TODO ??remove cookies setters to server side
//new user
router.post(
  "/user",
  //verifyRequestFields(User, FILTERS),
  async (req, res, next) => {
    const user = new User(req.body);

    try {
      await user.save();

      // const token = await user.generateAuthToken();
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/user",
  authUser,
  // verifyRequestFields(User, FILTERS),
  async (req, res, next) => {
    console.log("data:", req.body);
    try {
      const _id = req.user._id;
      const user = await User.findOneAndUpdate({ _id }, req.body.user, {
        new: true,
        runValidators: true,
      });
      if (!user) return next(user);

      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/user/:id",
  authUser,
  verifyProfessor,
  async (req, res, next) => {
    console.log("userDelete");
    try {
      const _id = req.params.id;
      await User.findOneAndDelete(_id);
      res.send("user Deleted");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/user/logout", authUser, async (req, res, next) => {
  console.log("LOGOUT student");
  //TODO: ?? server or client side tokens?
  if (req.user.token === "") return next("NoToken");
  req.user.token = "";

  try {
    await req.user.save();
    //res.clearCookie("s_token");

    res.send("user logged out");
  } catch (err) {
    next(err);
  }
});

// router.get("/users/updateToken", auth, async (req, res, next) => {
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
