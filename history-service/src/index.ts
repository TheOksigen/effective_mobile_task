import express from 'express';
import cors from 'cors';
import historyRoutes from './routes/historyRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/history', historyRoutes);

app.listen(PORT, () => {
  console.log(`History service running on port ${PORT}`);
});
