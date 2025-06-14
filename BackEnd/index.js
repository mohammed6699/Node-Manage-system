import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const port = process.env.PORT;
const URL = process.env.MONGO_CONNECTION;
const app = express();
// taskRoutes imports
import taskRouter from "./src/routes/taskRoute.js";
import getTaskBySearch from "./src/controllers/searchTask.js"
import getFilterTask from './src/controllers/filterTask.js'
// userRoutes imports
import userRouter from "./src/routes/userRoute.js";
// reminder
import { setSubscription } from "./src/utlits/subscriptionStore.js";
mongoose.connect(URL).then(() =>{
    console.log("Data Base Connected");
});
app.use(express.json())
// task routes
app.use("/api/task", taskRouter);
app.use("/api/task/search", getTaskBySearch);
app.use("/api/task/filter", getFilterTask)
// reminder routes
app.post("/api/save-subscription", (req, res) => {
    let subscriptionStore = req.body;
    setSubscription(subscriptionStore);
    console.log(" Subscription saved",subscriptionStore);
    res.status(201).json({ message: "Subscription saved" });
});
// user routes
app.use("/api/user", userRouter);
app.listen(port, () => {
    console.log(`App is listing on port ${port}`);
})