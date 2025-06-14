import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const port = process.env.PORT;
const URL = process.env.MONGO_CONNECTION;
const app = express();
// taskRoutes imports
import taskRouter from "./rotes/taskRoutes.js";
import getTaskBySearch from "./controllers/searchTask.js"
import getFilterTask from './controllers/filterTask.js'
// userRoutes imports
import userRouter from "./rotes/userRotes.js";

mongoose.connect(URL).then(() =>{
    console.log("Data Base Connected");
});
app.use(express.json())
// task routes
app.use("/api/task", taskRouter);
app.use("/api/task/search", getTaskBySearch);
app.use("/api/task/filter", getFilterTask)
// reminder routes

// user routes
app.use("/api/user", userRouter);
app.listen(port, () => {
    console.log(`App is listing on port ${port}`);
})