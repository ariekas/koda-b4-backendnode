import prisma from "../lib/connectDB.js";

export async function findUserEmail(email) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export async function create(email, password) {
  return await prisma.user.create({
    data: {
      email,
      password
    }
  });
}
