const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const creatQustionAndAnswer = require('./src/routes/user.routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', authRoutes);
app.use('/api', creatQustionAndAnswer)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
