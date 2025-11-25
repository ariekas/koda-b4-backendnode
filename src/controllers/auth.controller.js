function loginController(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (email == "ari@gmail.com" && password == "123") {
      res.status(201).json({
        success: true,
        message: "Login susccess",
      });
    } else {
      res.status(401).json({
        Success: false,
        Messange: "Login Failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function registerController(req, res) {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    res.status(201).json({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  loginController,
  registerController,
};
