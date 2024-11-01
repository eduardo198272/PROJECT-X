const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;

    const newProduct = await Product.create({
      data: { name, description, price, category_id }
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

    const updatedProduct = await Product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, category_id }
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
