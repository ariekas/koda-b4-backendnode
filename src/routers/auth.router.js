const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/login",
  body(["email", "password"], "field is mandatory").notEmpty(),
  body("password", "password much be leght 6").isLength(6),
  body("email", "is not valid format").isEmail(),
  authController.loginController
);
router.post(
  "/register",
  body(["email", "password"], "field is mandatory").notEmpty(),
  body("password", "password much be leght 6").isLength(6),
  body("email", "is not valid format").isEmail(),
  authController.registerController
);

module.exports = router;
