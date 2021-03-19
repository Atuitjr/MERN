const Task = require('../models/Task');
const Project = require('../models/Project');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //extract project and see if it exists
    const { project } = req.body;
    const { id } = req.user;

    try {
        const currentProject = await Project.findById(project);
        if (!currentProject)
            return res.status(404).json({ msg: 'Project not found' });

        //see if the current project belong to the user
        if (currentProject.creator.toString() !== id)
            res.status(401).json({ msg: 'Operation denied' });

        //create the task
        const task = new Task(req.body);
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

//Obtain all tasks of actual user
exports.obtainTasks = async (req, res) => {
    //extract project and see if it exists
    const { project } = req.query;
    const { id } = req.user;
    try {
        const currentProject = await Project.findById(project);
        if (!currentProject)
            return res.status(404).json({ msg: 'Project not found' });

        //see if the current project belong to the user
        if (currentProject.creator.toString() !== id)
            res.status(401).json({ msg: 'Operation denied' });

        const tasks = await Task.find({ project });

        res.status(200).json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

//update a Task
exports.updateTask = async (req, res) => {
    const { project, name, state } = req.body;
    const { id } = req.user;
    try {
        const currentTask = await Task.findById(req.params.id);
        if (!currentTask)
            return res.status(404).json({ msg: 'Project not found' });

        const currentProject = await Project.findById(project);
        //see if the current project belong to the user
        if (currentProject.creator.toString() !== id)
            res.status(401).json({ msg: 'Operation denied' });

        //create object with new information
        const newTask = {};

        newTask.name = name;
        newTask.state = state;

        //save task
        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id },
            newTask,
            { new: true }
        );

        res.status(200).json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

//delete a project
exports.deleteTask = async (req, res) => {
    const { project } = req.query;
    const { id } = req.user;
    try {
        const currentTask = await Task.findById(req.params.id);
        if (!currentTask)
            return res.status(404).json({ msg: 'Project not found' });

        const currentProject = await Project.findById(project);
        //see if the current project belong to the user
        if (currentProject.creator.toString() !== id)
            res.status(401).json({ msg: 'Operation denied' });

        //delete task
        await Task.findByIdAndRemove({ _id: req.params.id });

        res.status(200).json({ msg: 'task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};
