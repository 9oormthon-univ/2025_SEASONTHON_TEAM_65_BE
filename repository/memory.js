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
    FROM Memories 
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

const getMemoryById = async (userId, memoryId) => {
  const query = `
    SELECT 
      memory_id as memoryId,
      course_id as courseId,
      DATE_FORMAT(activity_date, '%Y.%m.%d') as activityDate,
      image_url as imageUrl,
      mothers_quote as mothersQuote,
      my_feeling as myFeeling,
      DATE_FORMAT(created, '%Y.%m.%d') as created,
      DATE_FORMAT(updated, '%Y.%m.%d') as updated
    FROM Memories 
    WHERE user_id = ? AND memory_id = ?
  `;
  
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(query, [userId, memoryId]);
      return rows.length > 0 ? rows[0] : null;
    } finally {
      connection.release();
    }
  } catch (error) {
    throw error;
  }
};

export { getMemoriesByUserId, getMemoryById };
