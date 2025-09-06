import { v4 as uuidv4 } from 'uuid';
import * as userRepository from '../repository/user.js';

export const createUser = async (req, res) => {
    try {
        const { userEmail, userPassword, userName, profileImgUrl } = req.body;
        
        // Generate unique userId
        const userId = uuidv4();
        
        // Create user
        await userRepository.createUser({
            id: userId,
            email: userEmail,
            password: userPassword,
            name: userName,
            profileImgUrl
        });
        
        return res.status(201).json({
            userId,
            status: "success"
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to create user"
        });
    }
};
