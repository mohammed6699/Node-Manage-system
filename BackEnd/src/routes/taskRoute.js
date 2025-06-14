import verifyToken from "../middleware/verifyToken.js";
import {
  deleteTask,
  updateTask,
  addTask,
  getAllTasks
} from "../controllers/taskController.js";
import getTaskBySearch from "../controllers/searchTask.js";
import getFilterTask from "../controllers/filterTask.js";
import allowedTo from "../middleware/allowedTo.js";
import userRole from "../utlits/UeerRole.js";

import express from "express";

const taskRouter = express.Router();

// Main tasks routes
taskRouter
  .route("/")
  .get(verifyToken, getAllTAsk)
  .post(verifyToken, allowedTo(userRole.USER), addTask);

taskRouter
  .route("/:taskid")
  .patch(verifyToken, allowedTo(userRole.USER), updateTask)
  .delete(verifyToken, allowedTo(userRole.USER), deleteTask);

// Search routes with clear paths
taskRouter.route('/search').get(getTaskBySearch);
// Filter route
taskRouter.get("/filter", getFilterTask);

export default taskRouter;
