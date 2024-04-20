const fs = require('fs');
const bodyParser = require('body-parser');
const xmlParser = require('body-parser-xml');
const express = require('express');

xmlParser(bodyParser);
const router = express.Router();

router.post('/api/v1/add-income', (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const incomeData = {
        title,
        amount,
        category,
        description,
        date
    };

    // Convert income data to XML string
    const xmlData = generateIncomeXML(incomeData);

    try {
        // Append XML data to income.xml file
        fs.appendFileSync('income.xml', xmlData);
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/api/v1/get-incomes', (req, res) => {
    try {
        const xmlData = fs.readFileSync('income.xml', 'utf8');
        res.status(200).send(xmlData);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/api/v1/delete-income', (req, res) => {
    try {
        fs.unlinkSync('income.xml');
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


// Function to generate XML string for income data
const generateIncomeXML = (incomeData) => {
    const { title, amount, category, description, date } = incomeData;
    return `<income>\n<title>${title}</title>\n<amount>${amount}</amount>\n<category>${category}</category>\n<description>${description}</description>\n<date>${date}</date>\n</income>\n`;
};

module.exports = router;
