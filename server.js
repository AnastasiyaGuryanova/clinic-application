const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { loginUser, addRequest, getRequests } = require('./controllers');
const auth = require('./middleware/auth');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/api/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie('token', token, { httpOnly: true });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/requests', async (req, res) => {
  try {
    await addRequest(req.body);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/requests', auth, async (req, res) => {
  const requests = await getRequests();

  res.json(requests);
});

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'login.html')));

app.get('/requests', auth, (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'requests.html')));

mongoose.connect('mongodb+srv://guryanova:4a1uVD9yc4JyuYok@cluster.voydg.mongodb.net/clinic?retryWrites=true&w=majority')
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));
