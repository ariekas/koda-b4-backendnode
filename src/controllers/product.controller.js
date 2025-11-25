const productModels = require("../models/product.model");

function listProducts(req, res) {
  try {
    const products = productModels.arrProducts;
    if (products.length > 0) {
      res.status(201).json({
        success: true,
        message: "Getting List Products",
        data: products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error: Product Not Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listProducts,
};
