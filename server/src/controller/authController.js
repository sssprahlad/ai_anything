
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/authModel');

exports.register = async (req, res) => {
    const {email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    Users.findByEmail(email, async (err, exisingUser) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        if (exisingUser) {
            return res.status(400).json({status: 400, message: 'User already exists' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            Users.createUser({ email, password: hashedPassword }, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 500, message: 'Internal server error' });
                }
                return res.status(201).json({ status: 201, message: 'User created successfully' });
            });


        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
    });





};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    Users.findByEmail(email, async (err, user) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ status: 401, message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                message: 'Login successful',
                status: 200,
                token,
                user: { id: user.id, email: user.email }
            });
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
    });
};

