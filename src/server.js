import express from 'express';
import mongoose from 'mongoose';
import routers from 'Routes/index.js';
import cors from 'cors';
import dot from 'dotenv';

dot.config();
const app = express();
const port = process.env.PORT || 5000;

// mongoDB connection establish
mongoose.connect('mongodb://localhost/userdetails', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connected successfully'))
    .catch(e => console.error('mongoDB connection failed ' + e));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
app.use('/api', routers);

// Server listen initilized
app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
}).on('error', e => {
    console.error(e);
});
