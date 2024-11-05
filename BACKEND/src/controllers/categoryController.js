const Category = require('../models/category'); 

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findMany({
      include: {
        parent: { 
          select: {
            id: true,
            name: true 
          }
        }
      }
    });

    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      parent: category.parent ? `${category.parent.name}` : 'Não possui',
      parent_id: category.parent ? category.parent.id : null,
      created_at: category.created_at,
      updated_at: category.updated_at
    }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findUnique({
      where: { id: parseInt(id) },
      include: {
        parent: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    const formattedCategory = {
      id: category.id,
      name: category.name,
      parent: category.parent ? category.parent.name : 'Não possui',
      parent_id: category.parent ? category.parent.id : null,
      created_at: category.created_at,
      updated_at: category.updated_at
    };

    res.json(formattedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category', details: error.message });
  }
};


exports.getCategoryDependencies = async (req, res) => {
  try {
    const { id } = req.params;

    const dependentCategories = await Category.findMany({
      where: { parent_id: parseInt(id) },
      select: {
        id: true,
        name: true
      }
    });

    res.json({
      dependencies: dependentCategories.length > 0 ? dependentCategories : []
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check dependencies', details: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name, parent_id } = req.body;
  try {
    const existingCategories = await Category.findMany({ where: { name } });

    if (existingCategories.length > 0) {
        return res.status(400).json({ error: 'O nome da categoria já existe.' });
    }

    const newCategory = await Category.create({
      data: {
        name,
        parent_id
      }
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parent_id } = req.body;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const categoryToUpdate = await Category.findUnique({ where: { id: parseInt(id) } });
    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    if (parent_id === parseInt(id)) {
      return res.status(400).json({ error: 'Categoria pai inválida.' });
    }

    const existingCategories = await Category.findMany({ where: { name } });
    if (existingCategories.length > 0) {
      const categoryExists = existingCategories.some(category => category.id !== parseInt(id));
      if (categoryExists) {
        return res.status(400).json({ error: 'O nome da categoria já existe.' });
      }
    }

    const updatedCategory = await Category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        parent_id
      }
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Erro ao atualizar a categoria:', error); 
    res.status(500).json({ error: 'Falha ao atualizar a categoria', details: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};
