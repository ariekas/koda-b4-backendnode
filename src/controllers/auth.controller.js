const {validationResult} = require("express-validator");
/**
 * POST /login
 * @summary Login user
 * @description Endpoint untuk login user menggunakan email & password statis.
 * @tags Auth
 * @param {object} request.body.required - Data login
 * @example request - contoh body
 * {
 *   "email": "ari@gmail.com",
 *   "password": "123"
 * }
 * @return {object} 201 - Login success response
 * @example response - Login success
 * {
 *   "success": true,
 *   "message": "Login success"
 * }
 * @return {object} 401 - Login failed response
 * @example response - Login failed
 * {
 *   "success": false,
 *   "message": "Login Failed"
 * }
 */
function loginController(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()){
    res.json({
      success: false,
      message: "error validate",
      result : result.array()
    });
  };
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (email == "ari@gmail.com" && password == "123") {
      res.status(201).json({
        success: true,
        message: "Login susccess"
      });
    } else {
      res.status(401).json({
        Success: false,
        Messange: "Login Failed"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * POST /register
 * @summary Register user
 * @description Endpoint untuk registrasi user menggunakan email & password.
 * @tags Auth
 * @param {object} request.body.required - Data register
 * @example request - contoh body
 * {
 *   "email": "user@gmail.com",
 *   "password": "abc123"
 * }
 * @return {object} 201 - Register success response
 * @example response
 * {
 *   "success": true,
 *   "message": "Register success"
 * }
 */
function registerController(req, res) {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    res.status(201).json({
      success: true,
      message: "Register success"
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  loginController,
  registerController
};
