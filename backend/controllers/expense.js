const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const xmlParser = require('body-parser-xml');
const { DOMParser } = require('xmldom');

xmlParser(bodyParser);
const router = express.Router();

router.post('/api/v1/add-expense', (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const expenseData = { title, amount, category, description, date };

  const xmlData = generateExpenseXML(expenseData);

  try {
    fs.appendFileSync('expenses.xml', xmlData);
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/api/v1/get-expenses', (req, res) => {
  try {
    const xmlData = fs.readFileSync('expenses.xml', 'utf8');
    const expenses = parseExpensesFromXML(xmlData);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/api/v1/delete-expense/:id', (req, res) => {
  const { id } = req.params;

  try {
    const xmlData = fs.readFileSync('expenses.xml', 'utf8');
    const expenses = parseExpensesFromXML(xmlData);
    const indexToDelete = expenses.findIndex(expense => expense.id === id);

    if (indexToDelete !== -1) {
      expenses.splice(indexToDelete, 1);
      const updatedXMLData = generateXMLFromExpenses(expenses);
      fs.writeFileSync('expenses.xml', updatedXMLData);
      res.status(200).json({ message: 'Expense Deleted' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

const parseExpensesFromXML = (xmlString) => {
  const xmlDocument = new DOMParser().parseFromString(xmlString, 'text/xml');
  const expenseElements = xmlDocument.getElementsByTagName('expense');
  let expenses = [];

  for (let i = 0; i < expenseElements.length; i++) {
    const expenseElement = expenseElements[i];
    const title = expenseElement.getElementsByTagName('title')[0].textContent;
    const amount = expenseElement.getElementsByTagName('amount')[0].textContent;
    const category = expenseElement.getElementsByTagName('category')[0].textContent;
    const description = expenseElement.getElementsByTagName('description')[0].textContent;
    const date = expenseElement.getElementsByTagName('date')[0].textContent;

    expenses.push({ title, amount, category, description, date });
  }

  return expenses;
};

const generateXMLFromExpenses = (expenses) => {
  let xmlData = '<expenses>\n';
  expenses.forEach(expense => {
    xmlData += `<expense>\n<title>${expense.title}</title>\n<amount>${expense.amount}</amount>\n<category>${expense.category}</category>\n<description>${expense.description}</description>\n<date>${expense.date}</date>\n</expense>\n`;
  });
  xmlData += '</expenses>';
  
  return xmlData;
};

const generateExpenseXML = (expenseData) => {
  const { title, amount, category, description, date } = expenseData;
  return `<expense>\n<title>${title}</title>\n<amount>${amount}</amount>\n<category>${category}</category>\n<description>${description}</description>\n<date>${date}</date>\n</expense>\n`;
};

module.exports = router;