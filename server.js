import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/productsRoutes.js';
//require('colors');

//declare
dotenv.config();

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI).then(() => { 
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err.message);
});

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));
//app.use();

//routes
app.use('/api/products/', productRouter);
//app.use('/addproducts', addProductController);

//Create Port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Server is running on the Port: http://localhost:${PORT}`);
});

