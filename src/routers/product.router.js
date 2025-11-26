import { Router } from "express";
import { listProducts, CreateProduct, EditProduct, detailProduct, deleted, uploadImageController } from "../controllers/product.controller.js";
import upload from "../lib/middelware/uploadImage.js";
const router = Router();

router.get("/", listProducts);
router.post("/", CreateProduct);
router.patch("/:id", EditProduct);
router.get("/:id", detailProduct);
router.delete("/:id", deleted);
router.post(
  "/upload/image/:id",
  upload.single("image"),
  uploadImageController
);

export default router;
