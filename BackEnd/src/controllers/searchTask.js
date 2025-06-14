import { SUCCESS, ERROR } from "../utils/http-status.js";
import taskModel from "../models/taskModel.js";
const getTaskBySearch = async(req, res) => {
    const searchQuery = req.query;
    const Category = searchQuery.category;
    const Title = searchQuery.Title;
    const Description = searchQuery.Description;
    if(!Category && !Title && !Description){
        res.status(400).json({status:ERROR, data: {Title: "Please enter something to start search"}});
    }
    try {
        const search = {}
        if(Category) search.Category = Category;
        if(Title) search.Title = Title;
        if(Description) search.Description = Description
        const task = await taskModel.find(search);
        res.status(201).json({status: SUCCESS, data: {task}}) 
    } catch (err) {
        res.status(500).json({status: ERROR, data: null, Error: err})
    }
}
export default getTaskBySearch