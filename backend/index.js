import express from "express"
import { PORT, mongoDBURL } from "./config.js"
// import { Book } from "./models/bookModel.js";
import router from "./routes/bookRoute.js";
import mongoose from "mongoose";
import cors from 'cors';


const app = express();

//Parsing request query using express middleware
app.use(express.json());


//Middleware for handling CORS(cross-origin resource sharing) policy
//Opn 1 : Allow all origins with Default of Cors(*)
app.use(cors());

//Opn 2 : Allow Custom Origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-type']
//     })
// );

app.get('/', (req,res)=>{
    console.log(req)
    return res.status(234).send("Hello, this is a Book Store")
});

app.use('/books', router)


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