const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const projectController = require('../controllers/projectController');

//Create a project
// api/projects
router.post(
    '/',
    auth,
    [check('name', 'The project name is required').not().isEmpty()],
    projectController.createProject
);
//obtain all projects
router.get('/', auth, projectController.obtainProjects);

//update project by id
router.put(
    '/:id',
    auth,
    [check('name', 'The project name is required').not().isEmpty()],
    projectController.updateProject
);

//delete a project by id
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
