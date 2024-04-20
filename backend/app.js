// app.js

const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const bodyParser = require('body-parser');
const xmlParser = require('body-parser-xml');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Configure body-parser-xml
xmlParser(bodyParser);
app.use(bodyParser.xml());

// Import transactions app
const transactionsApp = require('../backend/routes/transactions');

// Use transactions app
app.use('/api/v1/', transactionsApp);

// Example route for handling XML data
app.post('/api/v1/data/', (req, res) => {
  // Example: Save XML data to a file
  const xmlData = req.body;
  const xmlFilePath = path.join(__dirname, 'data.xml');
  fs.writeFileSync(xmlFilePath, xmlData);

  res.send('Data saved successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
