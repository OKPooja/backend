const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;
    
        // Check if all mandatory fields are filled
        if (!email || !password || !name) {
            return res.status(400).json({ 
                code: 400,
                status: "failure",
                message: "Please fill all mandatory fields" 
            });
        }
    
        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                code: 400,
                status: "failure",
                message: "Email is already registered"
            });
        }
    
        // Create a new user
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
    
        // Prepare response data (omit password)
        const userData = savedUser.toObject();
        delete userData.password;
    
        // Return success response
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'User registered successfully',
            data: [userData]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            status: "failure",
            message: "Internal server error"
        });
    }
    
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                code: 400,
                status: "failure",
                message: "Please provide both email and password"
            });
        }

        // Find user by email
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                code: 404,
                status: "failure",
                message: "User not found"
            });
        }

        // Check if the provided password matches the user's password
        if (existingUser.password !== password) {
            return res.status(400).json({
                code: 400,
                status: "failure",
                message: "Invalid password"
            });
        }
        //Remove password from user details
        const userData = existingUser.toObject();
        delete userData.password;
        
        // Return success response
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Login successful",
            data: userData
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            status: "failure",
            message: "Internal server error"
        });
    }
});

module.exports = router;