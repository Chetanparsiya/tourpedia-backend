import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"

const app = express();

app.use(morgan("dev"))
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors())
app.use("/users", userRouter) ;

const port = 5000;
const MONGO_URL = "mongodb+srv://root:root123@cluster0.jb1ry.mongodb.net/tour_db?retryWrites=true&w=majority"

//mongodb+srv://root:root@123@cluster0.jb1ry.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(MONGO_URL).then(()=> {
  app.listen(port, ()=> { console.log(`Server running on port no ${port}`)})
}).catch(err => {
  console.log(`${err} didn't connect`)
})