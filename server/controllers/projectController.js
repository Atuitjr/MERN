const Project = require('../models/Project');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //create new project
        const project = new Project(req.body);

        //save creator into the project
        project.creator = req.user.id;

        //save project
        project.save();
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

//Obtain all of actual user
exports.obtainProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({
            created: -1,
        });
        res.status(200).json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

//update a project
exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;
        const newProject = {};

        if (name) newProject.name = name;

        //exists id
        let project = await Project.findById(req.params.id);

        //exists project
        if (!project)
            return res.status(400).json({ msg: 'This project does not exist' });

        //verify its the same user
        if (project.creator.toString() !== req.user.id)
            return res
                .status(401)
                .json({ msg: 'You have no rights to modify this project' });

        //update
        project = await Project.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: newProject },
            { new: true }
        );

        res.json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

//delete a project
exports.deleteProject = async (req, res) => {
    try {
        //exists id
        let project = await Project.findById(req.params.id);

        //exists project
        if (!project)
            return res.status(400).json({ msg: 'This project does not exist' });

        //verify its the same user
        if (project.creator.toString() !== req.user.id)
            return res
                .status(401)
                .json({ msg: 'You have no rights to modify this project' });

        //delete
        project = await Project.findByIdAndRemove({ _id: req.params.id });

        res.json({ msg: 'Project deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};
