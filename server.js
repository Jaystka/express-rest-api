const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Data sementara (in-memory)
let users = [
  { id: 1, name: 'Jaystka', email: 'Jaystka@gmail.com' },
  { id: 2, name: 'Pradana', email: 'Pradana@gmail.com' },
  { id: 3, name: 'Kusuma', email: 'Kusuma@gmail.com' },
];

// ✅ GET /users → Menampilkan semua pengguna
app.get('/users', (req, res) => {
  res.json({
    success: true,
    message: 'List of users',
    data: users,
  });
});

// ✅ GET /users/:id → Menampilkan detail pengguna
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// ✅ POST /users → Menambah pengguna baru
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validasi input
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required',
    });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
