const express = require("express");
const  productController = require("../controllers/product.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest : "uploads/"});

router.get("/", productController.listProducts);
router.post("/", productController.CreateProduct);
router.patch("/:id", productController.EditProduct);
router.get("/:id", productController.detailProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/upload/image/:id", upload.single("image"), productController.uploadImage);

module.exports = router;
