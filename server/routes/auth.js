// creating auth routes
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const authController = require('../controllers/authController');

//Create user => /api/auth
router.post(
    '/',
    [
        check('email', 'the email is not valid').isEmail(),
        check(
            'password',
            'the name password has to have at least 6 characters'
        ).isLength({ min: 6 }),
    ],
    authController.authUser
);

//obtain the authenticated user
router.get('/', auth, authController.authenticatedUser);

module.exports = router;
