const express = require('express');
const bodyParser = require('body-parser');
const xmlParser = require('body-parser-xml');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

const app = express();

// Middleware function for transactions
const transactionMiddleware = (req, res, next) => {
  console.log('Transaction middleware executed');
  next();
};

// Configure body-parser-xml
xmlParser(bodyParser);

// Parse XML request body
app.use(bodyParser.xml());

// Use transaction middleware
app.use(transactionMiddleware);

// Endpoints for expenses and income
app.post('/api/v1/add-income', (req, res) => {
    addIncome(req, res);
});

app.get('/api/v1/get-incomes', (req, res) => {
    getIncomes(req, res);
});

app.delete('/api/v1/delete-income/:id', (req, res) => {
    deleteIncome(req, res);
});

app.post('/api/v1/add-expense', (req, res) => {
    addExpense(req, res);
});

app.get('/api/v1/get-expenses', (req, res) => {
    getExpense(req, res);
});

app.delete('/api/v1/delete-expense/:id', (req, res) => {
    deleteExpense(req, res);
});

module.exports = app;
