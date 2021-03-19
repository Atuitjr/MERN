const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validation errors?
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //unique mail?
        let existingMail = await User.findOne({ email });
        if (existingMail) {
            return res.status(400).json({ msg: 'The mail already exists' });
        }
        let user;

        //create new user
        user = new User(req.body);
        //hashing password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //save new user
        await user.save();

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
                res.status(200).json({ token, msg: 'User created' });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error');
    }
};
