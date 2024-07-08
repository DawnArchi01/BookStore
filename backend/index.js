import express from "express"
import dotenv from "dotenv"
dotenv.config({ path: './config.env'})
import router from "./routes/bookRoute.js";
import mongoose from "mongoose";
import cors from 'cors';

const mongoDBURL = process.env.mongoDBURL
// console.log(mongoDBURL)
const PORT = process.env.PORT || 5555
// console.log(PORT)
const app = express();

//Parsing request query using express middleware
app.use(express.json());


//Middleware for handling CORS(cross-origin resource sharing) policy
//Opn 1 : Allow all origins with Default of Cors(*)
// app.use(cors(corsOptions));

//Opn 2 : Allow Custom Origins
app.use(
    cors({
        origin:['http://localhost:5173',  'https://bookstore-client-fyw4.onrender.com'],
        // methods: ['GET', 'POST', 'PUT', 'DELETE'],
        
    })
);

app.get('/', (req,res)=>{
    console.log(req)
    return res.status(234).send("Hello, this is a Book Store")
});

app.use('/books', router)
mongoose.set('strictQuery', false)

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("Application connected to database")
        app.listen(PORT, ()=>{
            console.log(`App is listening to port : ${PORT}`)
        }) ;
    })
    .catch((err)=>{
        console.log(err);
    });