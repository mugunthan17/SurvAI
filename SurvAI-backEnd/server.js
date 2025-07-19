import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/analyze', analyzeRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});