import prisma from "../lib/connectDB.js";

export async function getAll(search, sort, order) {
  const where = {};

  if (search) {
    where.name = {
      contains: search || ""
    };
  }

  let orderBy = undefined;
  if (sort === "price") {
    orderBy = {
      price: order === "desc" ? "desc" : "asc"
    };
  }

  return prisma.product.findMany({
    where,
    orderBy
  });
}

export async function create(name, price) {
  return await prisma.product.create({
    data:{
      name,
      price
    }
  });
}

export async function detail(id) {
  return await prisma.product.findUnique({
    where:{
      id
    }
  });
}

export async function uploadImage(id, imagePath) {
  const extProduct = detail(id);

  if (!extProduct) {
    console.log("Product not found");
  }
  const uploadImage = await prisma.product.update({
    where:{
      id : Number(id)
    },
    data:{
      image: imagePath
    }
  });

  return uploadImage;
}

export async function edit(name, price, id) {
  const extProduct = detail(id);

  if (!extProduct) {
    console.log("Product not found");
  }

  const updatedData = await prisma.product.update({
    where: {id : Number(id)},
    data:{
      name,
      price
    }
  });
  return updatedData;
}

export async function deleteProduct(id) {
  const extProduct = detail(id);

  if (!extProduct) {
    console.log("Product not found");
  }

  const product = await prisma.product.delete({
    where:{id: Number(id)}
  });

  return product;
}
