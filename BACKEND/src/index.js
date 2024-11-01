const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
