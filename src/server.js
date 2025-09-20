const express = require('express');
const path = require('path');
const { validateCredentials } = require('./utils');
const { addItem, getItems } = require('./services');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (validateCredentials(username, password)) {
    return res.status(200).json({ message: 'OK', token: 'demo-token' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/items', (req, res) => {
  res.json(getItems());
});

app.post('/api/items', (req, res) => {
  try {
    const { name } = req.body || {};
    const created = addItem(name);
    res.status(201).json(created);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

// Root -> login page
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '..', 'public', 'login.html')));

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
module.exports = app;
