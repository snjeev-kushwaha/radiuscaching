const userModel = require('../models/userModel');
const NodeCache = require('node-cache');
const cache = new NodeCache();

async function getUsers(req, res) {
    try {
        const cachedUsers = cache.get('users');

        if (cachedUsers) {
            return res.json({ users: cachedUsers });
        }

        const users = await userModel.getUsers();

        // cache.set('users', users, 120);   // 2 minutes
        cache.set('users', users, 30);  // 30 seconds

        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const user = await userModel.getUserById(id);
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function createUser(req, res) {
    const user = req.body;
    try {
        const userId = await userModel.createUser(user);
        return res.json({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    try {
        const updated = await userModel.updateUser(id, user);
        return res.json({ updated, user });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const deleted = await userModel.deleteUser(id);
        cache.del('users');
        return res.json({ message: 'User deleted successfully', deleted });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};