const arrProducts = [
  {
    id: 1,
    name: "Coffe Latte",
    price: 25000
  },
  {
    id: 2,
    name: "Nasi Goreng",
    price: 32000
  },
  {
    id: 3,
    name: "Mineral Watter",
    price: 5000
  }
];

function create(newProduct) {
  arrProducts.push(newProduct);
}

function detail(id) {
  return arrProducts.find((item) => item.id === id);
}

function edit(newProduct, id) {
  const product = arrProducts.find((item) => item.id === Number(id));
  if (!product) return null;

  const index = arrProducts.indexOf(product);

  const updatedData = {
    ...product,
    ...newProduct
  };

  arrProducts.splice(index, 1, updatedData);

  return updatedData;
}

function deleteProduct(id){
  const product = arrProducts.find((item) => item.id === Number(id));
  if (!product) return null;

  const index = arrProducts.indexOf(product);

  arrProducts.splice(index, 1);

  return product;
}

module.exports = {
  arrProducts,
  create,
  detail,
  edit,
  deleteProduct
};
