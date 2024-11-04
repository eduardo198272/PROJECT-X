const Category = require('../models/category'); // Certifique-se de que o caminho do modelo esteja correto

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findMany({
      include: {
        parent: { // Relacionamento com a categoria pai agora está disponível
          select: {
            name: true // Busca apenas o nome da categoria pai
          }
        }
      }
    });

    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      parent: category.parent ? `Categoria pai: ${category.parent.name}` : 'Categoria pai: Não possui',
      created_at: category.created_at,
      updated_at: category.updated_at
    }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};


exports.getCategoryDependencies = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscando categorias que possuem o parent_id igual ao id da categoria que estamos verificando
    const dependentCategories = await Category.findMany({
      where: { parent_id: parseInt(id) },
      select: {
        id: true,
        name: true
      }
    });

    // Retorna as categorias dependentes se existirem
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
  try {
    const updatedCategory = await Category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        parent_id
      }
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category', details: error.message });
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
