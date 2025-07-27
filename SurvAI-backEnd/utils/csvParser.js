import csv from 'csvtojson';

const parseCSV = async (filePath) => {
    const data = await csv().fromFile(filePath);
    return data;
};

export default parseCS;