import ExcelJS from 'exceljs';

const parseExcelJS = async function parseExcelJS(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const rows = [];
    // Get headers from the first row
    const headerRow = worksheet.getRow(1);
    // ExcelJS row.values are 1-indexed, so slice(1) to get actual values
    const headers = headerRow.values.slice(1);

    // If you want to log headers for debugging:
    console.log("Parsed Excel Headers:", headers);

    // Iterate over rows starting from the second row (data rows)
    // worksheet.eachRow takes an optional second argument for options like startRow/endRow
    worksheet.eachRow({ includeEmpty: false, firstRow: 2 }, (row, rowNumber) => {
        const rowValues = row.values.slice(1); // Get actual row values, slicing off the null at index 0
        const obj = {};
        headers.forEach((header, idx) => {
            // Ensure header is not null/undefined/empty string
            if (header) {
                obj[header] = rowValues[idx] !== undefined ? rowValues[idx] : null; // Handle potential undefined values
            }
        });
        rows.push(obj);
    });

    // The 'rows' array now directly contains the objects mapping headers to values
    return rows;
};

export default parseExcelJS;