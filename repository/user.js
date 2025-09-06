'use strict';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from '../config/common.js';
import { pool } from './connect.js';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 사용자 정보 조회
 *     description: 데이터베이스에 저장된 모든 사용자 정보를 반환합니다.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: 사용자 목록 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                       user_name:
 *                         type: string
 *                       user_password:
 *                         type: string
 *                       user_email:
 *                         type: string
 *                       profile_img_url:
 *                         type: string
 *                       created:
 *                         type: string
 *                         format: date-time
 *                       updated:
 *                         type: string
 *                         format: date-time
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 새로운 사용자 등록
 *     description: 새로운 사용자를 등록하고 고유한 userId를 반환합니다.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userEmail
 *               - userPassword
 *               - userName
 *             properties:
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               userPassword:
 *                 type: string
 *                 example: your_password
 *               userName:
 *                 type: string
 *                 example: 김민지
 *               profileImgUrl:
 *                 type: string
 *                 example: https://example.com/profile.jpg
 *     responses:
 *       201:
 *         description: 사용자 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 550e8400-e29b-41d4-a716-446655440000
 *                 status:
 *                   type: string
 *                   example: success
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to create user
 */
// ---------[post]create-user---------
const createUser = async (req, res) => {
    try {
        const { userEmail, userPassword, userName, profileImgUrl } = req.body;
        timeLog('POST /signup - Request received');
        
        // Generate unique userId
        const userId = uuidv4();
        
        const query = `
            INSERT INTO user (user_id, user_email, user_password, user_name, profile_img_url)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const connection = await pool.getConnection(async conn => conn);
        try {
            await connection.query(query, [userId, userEmail, userPassword, userName, profileImgUrl]);
            timeLog('POST /signup - User created successfully');
            return res.json({
                userId,
                status: "success"
            });
        } catch (err) {
            console.error('Query Error:', err);
            return res.status(500).json({
                status: "error",
                message: "Failed to create user"
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('DB Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Database connection error"
        });
    }
};

// ---------[get]all-users---------

const getAllUsers = async (req, res) => {
  const query = 'SELECT * FROM user';
  const results = {};
  results.result = true;
  results.error = [];
  results.users = [];

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows, fields] = await connection.query(query);
      results.users = rows;
    } catch (err) {
      results.result = false;
      results.error.push('Query Error');
    }
    connection.release();
  } catch (err) {
    results.result = false;
    results.error.push('DB Error');
  }
  res.send(results);
  consoleBar();
  timeLog('GET all-users called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export { getAllUsers, createUser };