// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import parseCSV from '../utils/csvParser.js';
// import parseExcelJS from "../utils/xlsxParser.js";

// const router = express.Router();
// const upload = multer({dest:'uploads/'});

// const genAi = new GoogleGenerativeAI({apiKey:process.env.GEMINI_API_KEY});
// const model = genAi.getGenerativeModel({model:"gemini-2.0-flash"});


// router.post('/', upload.single('file'),async(req,res)=> {
//     try{
//         const {option, question } = req.body;
//         const file = req.file;
//         if(!file) {
//             return res.status(400).json({error: 'No file uploaded'});
//         }

//         const ext = path.extname(file.originalname).toLowerCase();

//         let data;
//         if(ext == '.csv'){
//             data = await parseCSV(file.path);
//         } else {
//             data = await parseExcelJS(file.path);
//         }

//         const trimmed = data.slice(0,50);
//         const context = JSON.stringify(trimmed,null,2);

//         const prompt = option === 'custom'
//             ? `Given the following survey data:\n${context}\nAnswer this question:${question}`
//             : `Analyze the following survey data:\n${context}\nGenerate a summary with insights, trends, and sentiment analysis.`;

//         const result = await model.generateContent(prompt);
//         const text = result.response.text();

//         fs.unlinkSync(file.path);

//         res.json({result:text});
//         res.json({message: "File uploaded and analyzed successfully"});
//     } catch(error){
//         console.error('Error in analysis route:', error);
//         res.status(500).json({error: 'Somethig went wrong'});
//     }
// });

// export default router;

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import parseCSV from '../utils/csvParser.js';
import parseExcelJS from "../utils/xlsxParser.js";
import dotenv from 'dotenv';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let model;
try {
  model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 10240,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW,
      },
    ],
  });
  console.log("Gemini model initialized successfully.");
} catch (error) {
  console.error("Failed to initialize Gemini model:", error);
  process.exit(1); // Exit if model initialization fails
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Check if model was successfully initialized
    if (!model) {
      return res.status(500).json({ error: 'AI model not initialized. Check server logs.' });
    }

    const { option, question } = req.body;
    const file = req.file;

    console.log("Received file:", req.file);
    console.log("Received body:", req.body);

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const ext = path.extname(file.originalname).toLowerCase();

    let data;
    if (ext === '.csv') {
      data = await parseCSV(file.path);
    } else {
      data = await parseExcelJS(file.path);
    }

    const trimmed = data.slice(0, 10000);
    const context = JSON.stringify(trimmed, null, 2);

    //const context = JSON.stringify(data, null, 2);
    // --- LOGS ---
    // console.log("--- DEBUGGING CONTEXT ---");
    // console.log("Trimmed Data (first 20 rows):", trimmed);
    // console.log("Context sent to Gemini:", context);
    // console.log("--- END DEBUGGING CONTEXT ---");

    const prompt = option === 'custom'
      ? `Given the following survey data:\n${context}\nAnswer this question: ${question}`
      : `Analyze the following survey data:\n${context}\nGenerate a summary with insights, trends, and sentiment analysis.`;

    const chat = model.startChat();
    
    let result;
    const MAX_RETRIES = 5;
    let currentRetry = 0;
    let initialDelay = 1000;

    while(currentRetry < MAX_RETRIES){
      try{
        result = await chat.sendMessage(prompt);
        break;
      } catch(error){
        console.error(`Attempt ${currentRetry + 1} failed for /api/analyze:`, error);

        //if it is status code 429
        if(error.status === 429) {
          const retryInfo = error.errorDetails?.find(detail => detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo');
          const serverRetryDelay = retryInfo.retryDelay ? parseInt(retryInfo.retryDelay.replace('s','')) * 1000 : null;

          let delayMs = serverRetryDelay || initialDelay * Math.pow(2,currentRetry);
          delayMs = Math.min(delayMs,60000);

          console.warn(`Retrying in ${delayMs / 1000} seconds... (Attempt ${currentRetry + 1} of ${MAX_RETRIES})`);
          await delay(delayMs);
          currentRetry++;
        } else {
          throw error;
        }
      }
    }
    if(!result){
      throw new Error('Failed to get a response from Gemini API after multiple retries!');
    }

    const response = result.response;
    fs.unlinkSync(file.path);
    res.json({ result: response.text() });

  } catch (error) {
    console.error("Error in /api/analyze:", error);
    if(error.message.includes('Failed to get a response from Gemini API')){
      res.status(500).json({ error: error.message });
    } else if(error.status === 429) {
      res.status(429).json({error:'Too many requests to the AI Model to Handle. Please try Again shortly.'});
    } else {
      res.status(500).json({error: 'Something went wrong processing your request.'});
    }
  } finally {
    if(req.file && fs.existsSync(req.file.path)){
      fs.unlinkSync(req.file.path);
    }
  }
});

export default router;