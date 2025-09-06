'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './connect.js';

const getMemoriesByUserId = async (userId) => {
  const query = `
    SELECT 
      memory_id as memoryId,
      course_id as courseId,
      image_url as imageUrl,
      DATE_FORMAT(created, '%Y.%m.%d') as created,
      DATE_FORMAT(updated, '%Y.%m.%d') as updated
    FROM memories 
    WHERE user_id = ?
    ORDER BY created DESC
  `;
  
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(query, [userId]);
      return rows;
    } finally {
      connection.release();
    }
  } catch (error) {
    throw error;
  }
};

export { getMemoriesByUserId };
