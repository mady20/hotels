const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { readUsersData, writeUsersData } = require('../utils/utils');

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role = 'user' } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const users = readUsersData();
    const userAvailable = users.find(user => user.email === email);
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        _id: Date.now().toString(),
        username,
        email,
        password: hashedPassword,
        role
    };

    users.push(newUser);
    writeUsersData(users);

    console.log("User created Successfully");
    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
    });
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const users = readUsersData();
    const user = users.find(user => user.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

//@desc current user info
//@route GET /api/users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
