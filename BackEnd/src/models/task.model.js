import { Schema, model } from "mongoose";
import Priority from "../utils/priority.js";   
import Progress from "../utils/progress.js";   
import mongoose from "mongoose";

const taskModel = new Schema({
  Title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  Description: {
    type: String,
    maxlength: 500,
  },
  Due_Date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: [Priority.HIGH, Priority.MEDIUM, Priority.LOW],
    required: true,
  },
  progress: {
    type: String,
    enum: [Progress.COMPLETED, Progress.INPROGRESS, Progress.PENDING],
    default: Progress.INPROGRESS,
  },
  category: {
    type: String,
    maxlength: 50,
  },
  reminderTime:{
        type:Date,
        default:null,
        required:false,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true, 
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    },
  },
});

export default model("Task", taskModel);
