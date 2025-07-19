import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;
app.use(cors());
app.use(express.json());
app.use('/api/analyze', analyzeRoutes);

app.get('/', (req, res) => {
    res.send(`🎉 ${APP_NAME} Server is running successfully!`);
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});