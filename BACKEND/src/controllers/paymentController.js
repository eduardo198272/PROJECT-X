const Payment = require('../models/payment');

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findMany();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments', details: error.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { order_id, payment_date, amount, payment_method, status } = req.body;

    const newPayment = await Payment.create({
      data: { order_id, payment_date, amount, payment_method, status }
    });

    res.json(newPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment', details: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, payment_date, amount, payment_method, status } = req.body;

    const updatedPayment = await Payment.update({
      where: { id: parseInt(id) },
      data: { order_id, payment_date, amount, payment_method, status }
    });

    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment', details: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.delete({
      where: { id: parseInt(id) }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payment', details: error.message });
  }
};
