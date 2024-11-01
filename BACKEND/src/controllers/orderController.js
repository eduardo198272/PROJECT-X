const Order = require('../models/order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user_id, total_amount, status } = req.body;

    const newOrder = await Order.create({
      data: { user_id, total_amount, status }
    });

    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, total_amount, status } = req.body;

    const updatedOrder = await Order.update({
      where: { id: parseInt(id) },
      data: { user_id, total_amount, status }
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order', details: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.delete({
      where: { id: parseInt(id) }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', details: error.message });
  }
};
