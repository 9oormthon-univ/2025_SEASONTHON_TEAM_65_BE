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
 * /login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 로그인합니다.
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
 *             properties:
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               userPassword:
 *                 type: string
 *                 example: your_password
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userEmail:
 *                   type: string
 *                   example: user@example.com
 *                 userPassword:
 *                   type: string
 *                   example: your_password
 *                 userName:
 *                   type: string
 *                   example: 김민지
 *                 profileImgUrl:
 *                   type: string
 *                   example: https://example.com/profile.jpg
 *                 created:
 *                   type: string
 *                   format: date-time
 *                 updated:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 로그인 실패 - 잘못된 이메일 또는 비밀번호
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
 *                   example: Invalid email or password
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
 *                   example: Database connection error
 *
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
const createUser = async (userData) => {
    const { id, email, password, name, profileImgUrl } = userData;
    timeLog('Creating new user');
    
    const query = `
        INSERT INTO user (user_id, user_email, user_password, user_name, profile_img_url)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const connection = await pool.getConnection(async conn => conn);
    try {
        await connection.query(query, [id, email, password, name, profileImgUrl]);
        timeLog('User created successfully');
        return { success: true };
    } catch (err) {
        console.error('Query Error:', err);
        throw new Error('Failed to create user');
    } finally {
        connection.release();
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

const findUserByCredentials = async (email, password) => {
  timeLog('Finding user by credentials');

  const query = `
    SELECT user_email, user_password, user_name, profile_img_url, created, updated
    FROM user
    WHERE user_email = ? AND user_password = ?
  `;

  const connection = await pool.getConnection(async conn => conn);
  try {
    const [rows] = await connection.query(query, [email, password]);
    
    if (rows.length === 0) {
      return null;
    }

    timeLog('User found successfully');
    return {
      userEmail: rows[0].user_email,
      userPassword: rows[0].user_password,
      userName: rows[0].user_name,
      profileImgUrl: rows[0].profile_img_url,
      created: rows[0].created,
      updated: rows[0].updated
    };
  } finally {
    connection.release();
  }
};

export { getAllUsers, createUser, findUserByCredentials };