const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require('mysql2/promise');
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('DB_USER:', process.env.DB_USER); // Add this line

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '152314',
  database: process.env.DB_NAME || 'skillsphere'
});

// User registration
app.post('/api/register', async (req, res) => {
  const { name, email, password, location, skillsOffered, skillsWanted, availability, isPublic, role } = req.body;
  // Convert camelCase to snake_case for DB
  const skills_offered = skillsOffered;
  const skills_wanted = skillsWanted;
  const is_public = isPublic;
  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, location, skills_offered, skills_wanted, availability, is_public, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, password, location, skills_offered, skills_wanted, availability, is_public, role]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error(err); // <--- Add this line
    res.status(500).json({ error: err.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user profile
app.get('/api/user/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE is_public = 1');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
