import {getAll, create, edit, detail, deleteProduct, uploadImage} from "../models/product.model.js";

/**
 * GET /products
 * @summary Get list of products
 * @description Mendapatkan semua produk dengan fitur pencarian & sorting price.
 * @tags Products
 *
 * @param {string} search.query.optional - Cari produk berdasarkan name
 * @param {string} sort.query.optional - Gunakan "price" untuk mengurutkan berdasarkan harga
 * @param {string} product.query.optional - "asc" - dari yang termurah, atau "desc" - dari yang termahal
 *
 * @return {object} 201 - Success get list products
 * @example response - 201 - success
 * {
 *   "success": true,
 *   "message": "Getting List Products",
 *   "data": [
 *     { "id": 1, "name": "Coffe Latte", "price": 25000 }
 *   ]
 * }
 *
 * @return {object} 404 - Product not found
 * @example response - 404
 * {
 *   "success": false,
 *   "message": "Error: Product Not Found"
 * }
 */
export async function listProducts(req, res) {
  try {
    const search = req.query.search || null;
    const sort = req.query.sort || null;
    const order = req.query.order || "asc";

    const products = await getAll(search, sort, order);

    if (products.length > 0) {
      res.status(200).json({
        success: true,
        message: "Getting List Products",
        data: products
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error: Product Not Found"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

/**
 * GET /products/{id}
 * @summary Get detail product
 * @tags Products
 *
 * @param {number} id.path.required - ID produk
 *
 * @return {object} 201 - Success get detail product
 * @example response - 201
 * {
 *   "success": true,
 *   "message": "success get detail product",
 *   "data": { "id": 1, "name": "Coffe Latte", "price": 25000 }
 * }
 *
 * @return {object} 404 - Product not found
 * @example response - 404
 * {
 *   "success": false,
 *   "message": "error: product not found"
 * }
 */
export async function detailProduct(req, res){
  try {
    const product = detail(Number(req.params.id));
    if (!product){
      res.status(404).json({
        success:false,
        message:"error: product not found"
      });
    }else{
      res.status(201).json({
        success:true,
        message:"success get detail product",
        data: product
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET /products/{id}
 * @summary Get detail product
 * @tags Products
 *
 * @param {number} id.path.required - ID produk
 *
 * @return {object} 201 - Success get detail product
 * @example response - 201
 * {
 *   "success": true,
 *   "message": "success get detail product",
 *   "data": { "id": 1, "name": "Coffe Latte", "price": 25000 }
 * }
 *
 * @return {object} 404 - Product not found
 * @example response - 404
 * {
 *   "success": false,
 *   "message": "error: product not found"
 * }
 */
export async function CreateProduct(req, res) {
  try {
    const newProduct = req.body;
    const product = await create(newProduct);
    res.status(201).json({
      success: true,
      message: "success create product",
      data: product
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * PUT /products/{id}
 * @summary Edit a product
 * @tags Products
 *
 * @param {number} id.path.required - ID produk
 * @param {object} request.body.required - Data baru produk
 * @example request - Update body
 * {
 *   "name": "Nasi Goreng Spesial",
 *   "price": 35000
 * }
 *
 * @return {object} 201 - Success edit product
 * @example response - 201
 * {
 *   "message": "success edit product",
 *   "data": { "id": 2, "name": "Nasi Goreng Spesial", "price": 35000 }
 * }
 *
 * @return {object} 404 - Product not found
 * @example response - 404
 * {
 *   "message": "Product not found"
 * }
 */
export async function EditProduct(req, res) {
  try {
    const updated = await edit(req.body, Number(req.params.id));

    if (!updated) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(201).json({
      message: "success edit product",
      data: updated
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * DELETE /products/{id}
 * @summary Delete product
 * @tags Products
 *
 * @param {number} id.path.required - ID produk
 *
 * @return {object} 201 - Success delete product
 * @example response - 201
 * {
 *   "message": "success product deleted"
 * }
 *
 * @return {object} 404 - Product not found
 * @example response - 404
 * {
 *   "message": "Product not found"
 * }
 */
export async function deleted(req, res){
  try {
    const product = await deleteProduct(Number(req.params.id));

    if (!product){
      return res.status(404).json({
        message: "Product not found"
      });
    }else{
      return res.status(201).json({
        message: "susscess product deleted"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function uploadImageController(req, res) {
  try {
    const { id } = req.params;
    const imagePath = req.file.path;

    const updated = await uploadImage(id, imagePath);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product tidak ditemukan"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Upload image berhasil",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal upload image",
      error: error.message
    });
  }
}
