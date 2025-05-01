// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/submit', (req, res) => {
  const newEntry = req.body;
  let data = [];
  if (fs.existsSync('data.json')) {
    data = JSON.parse(fs.readFileSync('data.json'));
  }
  data.push({ ...newEntry, timestamp: new Date() });
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Success!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
