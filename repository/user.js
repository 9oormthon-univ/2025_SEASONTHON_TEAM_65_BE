'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from '../config/common.js';
import { pool } from './connect.js';

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