'use strict';
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

export { getAllUsers };