import * as XLSX from 'xlsx';
import fs from 'fs/promises';
import path from 'path';

const parseExcel = async function parseExcel(filePath) {
    try {
        const absoluteFilePath = path.resolve(filePath);
        const buffer = await fs.readFile(absoluteFilePath);
        
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        console.log("Parsed Excel Data (Sheet JS - first 5 rows): ", jsonData.slice(0, 5));
        return jsonData;
    } catch (error) {
        console.error("Error reading Excel File:", error);
        throw new Error("Could not read the Excel file. Make sure it's a valid .xls or .xlsx format.");
    }
};

export default parseExcel;
