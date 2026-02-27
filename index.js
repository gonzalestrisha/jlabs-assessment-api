require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Vite default
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Fetch user from Supabase
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error || !users || users.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = users[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d',
  });

  res.json({ token });
});

app.get('/api/profile', authenticateToken, async (req, res) => {
  // Fetch user info from Supabase
  const { id } = req.user;
  const { data: users, error } = await supabase
    .from('users')
    .select('id, email')
    .eq('id', id);

  if (error || !users || users.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user: users[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
