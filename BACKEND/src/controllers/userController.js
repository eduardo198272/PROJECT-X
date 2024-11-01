const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            data: { name, email, password_hash: hashedPassword, address, phone }
        });

        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address, phone } = req.body;

        const updatedUser = await User.update({
            where: { id: parseInt(id) },
            data: { name, email, address, phone }
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.delete({
            where: { id: parseInt(id) }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
};

