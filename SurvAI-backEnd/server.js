import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import summaryRoutes from './routes/SummaryRoutes.js'
import CustomRoutes from './routes/CustomRoutes.js';
import { getBlogs } from './getBlogs.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use('/api/summary', summaryRoutes);
app.use('/api/custom', CustomRoutes);

app.get('/', (req, res) => {
    res.send('🎉 SurvAI Server is running successfully!');
});

// === GET endpoint for the /api/blogs'
app.get('/api/blogs', async(req, res)=>{
  console.log(`[Server] Received requiest for /api/blogs`);
  try {
    const blogs = await getBlogs();
    res.json(blogs);
    console.log(`[Server] Sent ${blogs.length} blog posts to frontend.`);
  } catch (error) {
    console.log(`[Server] Eror handling /api/blogs request: ${error}`);
    res.status(500).json({error: "Failed to fetch blog posts from Notion."});
  }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Endpoint available for blogs at http://localhost:${PORT}/api/blogs`);
});
