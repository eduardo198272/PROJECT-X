const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Category = prisma.category;

module.exports = Category;
