const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    //validation errors?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //exists email
        let user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: 'The user doenst exist' });

        //correct password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword)
            return res.status(400).json({ msg: 'The password is incorrect' });

        //create and sign the jwt
        const payload = {
            user: { id: user.id },
        };
        //sign the JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error;

                //confirmation Response
                res.status(200).json({
                    token,
                    msg: 'Authentication confirmed',
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};

exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
};
