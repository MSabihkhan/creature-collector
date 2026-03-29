// server.js
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authrouter = require('./routes/auth');

const app = express();
// Middleware
const creaturerouter = require('./routes/creatures')
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(session({
secret: 'secret-key', // TODO: use env variable in real apps
resave: false,
saveUninitialized: true,
cookie: { httpOnly: true } // default: httpOnly true[4]
}));

require('dotenv').config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
// Basic route to check server
app.get('/', (req, res) => {
res.send('Hello from Creature Collector API');
});

app.use('/auth',authrouter)
app.use('/creatures',creaturerouter)


// 2. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});