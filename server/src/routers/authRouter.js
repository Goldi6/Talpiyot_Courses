const express = require("express");

const router = express.Router();
const authUser = require("../middleware/auth");
const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.get("/logout", authUser, authController.logout);

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
