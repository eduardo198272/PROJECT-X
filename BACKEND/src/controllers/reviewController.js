const Review = require('../models/review');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findMany();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;

    const newReview = await Review.create({
      data: { user_id, product_id, rating, comment }
    });

    res.json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review', details: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, product_id, rating, comment } = req.body;

    const updatedReview = await Review.update({
      where: { id: parseInt(id) },
      data: { user_id, product_id, rating, comment }
    });

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review', details: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.delete({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review', details: error.message });
  }
};
