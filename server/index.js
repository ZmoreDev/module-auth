const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET; // ควรเก็บใน .env

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    // สร้าง payload (ข้อมูลใน token)
    const payload = {
      username,
      role: 'admin',
    };

    // สร้าง token (อายุ 10 นาที)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });

    return res.json({
      token,
      username,
      expiresIn: 60 * 1, // 10 นาที
    });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === '1234') {
//     return res.json({
//       token: 'mock-jwt-token',
//       username: 'admin',
//       expiresIn: 60 * 10,
//     });
//   }
//   res.status(401).json({ message: 'Invalid credentials' });
// });
app.post('/api/refresh-token', (req, res) => {
  const { token } = req.body;
  const wrongSecret = '7sO6kOcoJuc0Ts4Upq9QBO8FNP4Cu0vF';

  try {

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token valid:', decoded);

    // สร้าง token ใหม่ (ต่ออายุ)
    const newToken = jwt.sign({ username: decoded.username, role: decoded.role }, JWT_SECRET, {
      expiresIn: '1m',
    });

    return res.json({
      token: newToken,
      expiresIn: 60 * 1,
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
