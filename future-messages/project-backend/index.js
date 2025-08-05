
const express = require('express');


const app = express();


const PORT = 3000;


app.use(express.json());
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Future Messages backend is running!');
});


app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
