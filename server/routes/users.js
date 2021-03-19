// creating user routes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controllers/userController');

//Create user => /api/users
router.post(
    '/',
    [
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'the email is not valid').isEmail(),
        check(
            'password',
            'the name password has to have at least 6 characters'
        ).isLength({ min: 6 }),
    ],
    userController.createUser
);
module.exports = router;
