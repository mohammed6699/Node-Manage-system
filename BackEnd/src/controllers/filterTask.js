import { ERROR, SUCCESS } from "../utils/http-status.js";
import taskModel from "../models/taskModel.js";
const getFilterTask = async(req, res) => {
    const query = req.query;
    const periority = query.periority;
    const category = query.category

    if(!periority && !category){
        res.status(500).json({status: ERROR, data: { title: "Set Filter method" }});
    }
    try {
        const filter = {}
        if(periority) filter.periority = periority;
        if(category) filter.category = category;
        const task = await taskModel.find(filter)
        res.status(201).json({status: SUCCESS, data: {task}})
    } catch (err) {
        res.status(402).json({status:ERROR, data: null, error: err})
    }
}
export default getFilterTask;