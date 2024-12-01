const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);

app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
