// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    return res.json({ token: 'mock-jwt-token', username: 'admin' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
