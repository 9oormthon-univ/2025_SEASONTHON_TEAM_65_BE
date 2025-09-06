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

// getNextMemoryId 함수 제거하고 createMemory 함수만 수정
const createMemory = async (memoryData) => {
  const query = `
    INSERT INTO Memories 
    (user_id, course_id, activity_date, image_url, mothers_quote, my_feeling, created, updated)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;
  
  const values = [
    memoryData.userId,
    memoryData.courseId,
    memoryData.activityDate,
    memoryData.imageUrl,
    memoryData.mothersQuote,
    memoryData.myFeeling
  ];
  
  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(query, values);
      return result.insertId; // AUTO_INCREMENT로 생성된 ID 반환
    } finally {
      connection.release();
    }
  } catch (error) {
    throw error;
  }
};

export { getMemoriesByUserId, getMemoryById, createMemory };