const express = require("express");
const productController = require("../controllers/product.controller");
const upload = require("./../../lib/middelware/uploadImage");
const router = express.Router();

router.get("/", productController.listProducts);
router.post("/", productController.CreateProduct);
router.patch("/:id", productController.EditProduct);
router.get("/:id", productController.detailProduct);
router.delete("/:id", productController.deleteProduct);
router.post(
  "/upload/image/:id",
  upload.single("image"),
  productController.uploadImage
);

module.exports = router;
