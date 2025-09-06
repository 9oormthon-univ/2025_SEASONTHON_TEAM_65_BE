import * as userRepository from '../repository/user.js';

export const createUser = async (req, res) => {
    try {
        const { userEmail, userPassword, userName, profileImgUrl } = req.body;
        
        if (!userEmail || !userPassword || !userName) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields"
            });
        }
        
        // Create user
        const result = await userRepository.createUser({
            email: userEmail,
            password: userPassword,
            name: userName,
            profileImgUrl
        });
        
        return res.status(201).json({
            userId: result.userId,
            status: "success"
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            status: "error",
            message: error.message || "Failed to create user"
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        
        // Login user
        const userData = await userRepository.findUserByCredentials(userEmail, userPassword);
        
        if (!userData) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }
        
        return res.json(userData);
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to login"
        });
    }
};
