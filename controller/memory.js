'use strict';
import { consoleBar, timeLog, resSend } from "../config/common.js";
import { getMemoriesByUserId } from '../repository/memory.js';

/**
 * @swagger
 * /memories:
 *   get:
 *     summary: 사용자별 추억 앨범 조회
 *     tags: [Memories]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 추억 앨범 조회 성공
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
 *                 Memories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       memoryId:
 *                         type: integer
 *                       courseId:
 *                         type: integer
 *                       imageUrl:
 *                         type: string
 *                       created:
 *                         type: string
 *                       updated:
 *                         type: string
 */
const getMemories = async (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return resSend(res, {
      result: false,
      error: ['userId is required'],
      Memories: []
    });
  }

  try {
    const memories = await getMemoriesByUserId(userId);
    resSend(res, {
      result: true,
      error: [],
      Memories: memories
    });
  } catch (error) {
    console.log(error);
    resSend(res, {
      result: false,
      error: ['Database Error'],
      Memories: []
    });
  }
  
  consoleBar();
  timeLog(`[GET] /memories Get memories called // userId: ${userId}`);
};

export { getMemories };
