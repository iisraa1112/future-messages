require('dotenv').config();

import express, { json } from 'express';
const app = express();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const messageRoutes = require('./routes/messageRoutes');

const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());

app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Future Messages backend is running!');
});
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found!'});
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
