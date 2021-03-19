const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const taskController = require('../controllers/taskController');

//Create a task
// api/tasks
router.post(
    '/',
    auth,
    [
        check('name', 'The task name is required').not().isEmpty(),
        check('project', 'The project name is required').not().isEmpty(),
    ],
    taskController.createTask
);
//obtain all tasks
router.get('/', auth, taskController.obtainTasks);

//update task by id
router.put('/:id', auth, taskController.updateTask);

//delete a project by id
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
