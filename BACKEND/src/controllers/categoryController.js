const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, parent_id } = req.body;

    const newCategory = await Category.create({
      data: { name, parent_id }
    });

    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent_id } = req.body;

    const updatedCategory = await Category.update({
      where: { id: parseInt(id) },
      data: { name, parent_id }
    });

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.delete({
      where: { id: parseInt(id) }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};
