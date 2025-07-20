import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import summaryRoutes from './routes/SummaryRoutes.js'
import CustomRoutes from './routes/CustomRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/summary', summaryRoutes);
app.use('/api/custom', CustomRoutes);

app.get('/', (req, res) => {
    res.send('🎉 SurvAI Server is running successfully!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
