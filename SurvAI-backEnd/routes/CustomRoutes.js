import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import dotenv from 'dotenv';
import parseCSV from '../utils/csvParser.js';
import parseExcel from "../utils/xlsxParser.js";

const router = express.Router();
const upload = multer({dest:'uploads/'});
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
let customQuestionModel;

try {
    customQuestionModel = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024000,
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    answer: {type:"STRING", description:"The answer to the custom question based on the provided data."}
                },
                required:["answer"]
            }
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
    console.log("Gemini Custom Question Model initialized successfully");
} catch (error) {
    console.error("Failed to initialize Gemini Custom Question Model: ",error);
    process.exit(1);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

router.post('/', upload.single('file'), async (req,res)=>{
    try {
        if(!customQuestionModel){
            return res.status(500).json({error: "AI Model not initialized. Check server logs."});
        }

        const {question} = req.body;
        const file = req.file;

        console.log("Received file for summary: ", file?.originalname);
        console.log("Received body for summary: ", req.body);

        if(!file){
            return res.status(400).json({error: "No file uploaded"});
        }

        const ext = path.extname(file.originalname).toLowerCase();
        let data;

        if(ext === '.csv'){
            data = await parseCSV(file.path);
        } else if(ext === '.xls' || ext === '.xlsx'){
            data = await parseExcel(file.path);
        } else {
            return res.status(400).json({error: 'Unsupported file format. Please upload a .csv,.xls or .xlsx file.'});
        }

        const context = JSON.stringify(data, null,2);

        //Log context details for the debugging 
        console.log("===Debugging Summary Context===");
        console.log(`Total row parsed from file: ${data.length}`);
        console.log("Context sent to Gemini (JSON string lenth): ", context.length);
        console.log("===END of Debugging Summary Context===");

        const prompt = `Given the following survey daa:\n${context}\nAnswer this question:${question}. Return the answer as a JSON object with the following structure: {"answer":"string"}.`;

        console.log("Prompt being sent (first 500 chars):", prompt.substring(0,500) + (prompt.length > 500 ? '...' : ''));

        const chat = customQuestionModel.startChat();

        let result;
        const MAX_RETIRES = 5;
        let currentRetry = 0;
        let initialDelay = 1000;

        while(currentRetry < MAX_RETIRES){
            try {
                result = await chat.sendMessage(prompt);
                break;
            } catch (error) {
                console.log(`Attempt:${currentRetry + 1}`, error);

                if(error.status === 429){
                    const retryInfo = error.errorDetails?.find(detail => detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo');
                    const serverRetryDetaly = retryInfo?.retryDelay? parseInt(retryInfo.retryDelay.replace('s','')) * 1000 : null;

                    let delayMs = serverRetryDetaly || initialDelay * Math.pow(2,currentRetry);
                    delayMs = Math.min(delayMs, 60000);

                    console.warn(`Retrying in ${delayMs / 1000} seconds...(Attempt ${currentRetry + 1} of ${MAX_RETIRES})`);
                    await delay(delayMs);
                    currentRetry++;
                } else {
                    throw error;
                }
            }
        }
        if(!result){
            throw new Error('Failed to get a response after multiple tries!');
        }

        const responseText = result.response.text();
        let parsedResult;
        try {
            parsedResult = JSON.parse(responseText);
        } catch(jsonError){
            console.error("Failed to parse the result: ", responseText, jsonError);
            return res.status(500).json({error: 'Not a valid result, raw response: '+ responseText.substring(0,200) + '...'});
        }
        res.json(parsedResult);
    } catch (error) {
        console.error("Error in the api route", error);
        if (error.message.includes('Failed to get a response from Gemini API')) {
            res.status(500).json({ error: error.message });
        } else if (error.status === 429) {
            res.status(429).json({ error: 'Too many requests to the AI Model. Please try again shortly.' });
        } else if (error.status) { 
            res.status(error.status).json({ error: error.message || 'AI model error.' });
        } else {
            res.status(500).json({ error: 'Something went wrong processing your request for summary.' });
        }
    } finally {
        if(req.file && fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
        }
    }
});

export default router;