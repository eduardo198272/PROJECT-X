const Product = require('../models/product');
const Category = require('../models/category');

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findUnique({ where: { id: parseInt(id) } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const category = await Category.findUnique({ where: { id: product.category_id } });
    const categoryName = category ? category.name : 'Categoria não encontrada';
    res.json({ ...product, category_name: categoryName });
  } catch (error) {
    console.error('Failed to fetch product', error);
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findMany();
    const productsWithCategory = await Promise.all(products.map(async (product) => {
      const category = await Category.findUnique({ where: { id: product.category_id } });
      const categoryName = category ? category.name : 'Categoria não encontrada';
      return { ...product, category_name: categoryName };
    }));
    res.json(productsWithCategory);
  } catch (error) {
    console.error('Failed to fetch products', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = await Product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category_id: parseInt(category_id),
        image
      }
    });

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedProduct = await Product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        category_id: parseInt(category_id),
        image
      }
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.delete({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};
