
import { ERROR, SUCCESS } from "../utlits/httpStatus.js";
import TaskModel from "../models/task.model.js";
import User from "../models/user.model.js";
import schedularReminder from "../utlits/reminder.scheduler.js";


// Get all tasks ( pagination + filtering by user)
const getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const allTasks = await TaskModel.find({ user: req.decodeToken._id })
      .skip(skip)
      .limit(limit);
      
    const count = await TaskModel.countDocuments({ user: req.decodeToken._id });

    res.status(200).json({
      status: SUCCESS,
      data: { allTasks },
      pagination: {
        total: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

// Add Task
const addTask = async (req, res) => {
  if (!req.decodeToken) {
    return res.status(401).json({ status: ERROR, message: "Unauthorized" });
  }

  try {
    const { Title, Description, Due_Date, category, priority ,progress,reminderTime } = req.body;

    const newTask = await TaskModel.create({
      Title,
      Description,
      Due_Date,
      category,
      priority,
      reminderTime,
      user: req.decodeToken._id,
      progress
    });
    schedularReminder(newTask);
    await User.findByIdAndUpdate(
      req.decodeToken._id,
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    res.status(201).json({ status: SUCCESS, data: { newTask } });
  } catch (error) {
    res.status(500).json({
      status: ERROR,
      message: "Failed to add task",
      error: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.taskid,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ status: ERROR, message: "Task not found" });
    }

    res.status(200).json({ status: SUCCESS, data: { updatedTask } });
  } catch (error) {
    res.status(400).json({ status: ERROR, error: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const deleted = await TaskModel.findByIdAndDelete(req.params.taskid);

    if (!deleted) {
      return res.status(404).json({ status: ERROR, message: "Task not found" });
    }

    res.status(200).json({ status: SUCCESS, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ status: ERROR, error: error.message });
  }
};

export { getAllTasks, addTask, updateTask, deleteTask };
