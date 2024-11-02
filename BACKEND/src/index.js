const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const imageRoutes = require('./routes/imageRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'uploads')));
console.log('Serving images from:', path.join(__dirname, 'uploads'));

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderItemRoutes);
app.use('/api', paymentRoutes);
app.use('/api', reviewRoutes);
app.use('/api', imageRoutes); 

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
