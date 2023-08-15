// import User from "../models/userModel.js";
import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).populate('user');
    res.json(tasks);
}
export const createTask = async (req, res) => {
    const {title, description, date} = req.body;
    const newTask = new Task({
        title,description, date, userId:req.user.id
    });
    const savedTask = await newTask.save();
    res.json(savedTask);

}
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({message: "Task not found when trying to search for it"});
    res.json(task);
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({message: "Task not found when trying to delete"});
    res.json(task);

}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!task) return res.status(404).json({message: "Task not found when trying to update it"});
    res.json(task);

}