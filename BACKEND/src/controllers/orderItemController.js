const OrderItem = require('../models/orderItem');

exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findMany();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order items', details: error.message });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;

    const newOrderItem = await OrderItem.create({
      data: { order_id, product_id, quantity, price }
    });

    res.json(newOrderItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order item', details: error.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, product_id, quantity, price } = req.body;

    const updatedOrderItem = await OrderItem.update({
      where: { id: parseInt(id) },
      data: { order_id, product_id, quantity, price }
    });

    if (!updatedOrderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order item', details: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const orderItem = await OrderItem.delete({
      where: { id: parseInt(id) }
    });

    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order item', details: error.message });
  }
};
