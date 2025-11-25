const productModels = require("../models/product.model");

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
function listProducts(req, res) {
  try {
    let products = productModels.arrProducts;

    if (req.query.search) {
      let search = req.query.search.toLowerCase();
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search)
      );
    }

    if (req.query.sort === "price") {
      let product = req.query.product === "desc" ? -1 : 1;

      products = products.sort((a, b) => {
        return (a.price - b.price) * product;
      });
    }

    if (products.length > 0) {
      res.status(201).json({
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
function detailProduct(req, res){
  try {
    const product = productModels.detail(Number(req.params.id));
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
function CreateProduct(req, res) {
  try {
    const newProduct = req.body;
    const product = productModels.create(newProduct);
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
function EditProduct(req, res) {
  try {
    const updated = productModels.edit(req.body, Number(req.params.id));

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
function deleteProduct(req, res){
  try {
    const product = productModels.deleteProduct(Number(req.params.id));

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

module.exports = {
  listProducts,
  CreateProduct,
  EditProduct,
  detailProduct,
  deleteProduct
};
