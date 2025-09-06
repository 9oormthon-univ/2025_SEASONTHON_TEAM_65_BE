'use strict';
import { consoleBar, timeLog, resSend } from "../config/common.js";
import { getMemoriesByUserId, getMemoryById } from '../repository/memory.js';

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


/**
 * @swagger
 * /memory/{userId}/{memoryId}:
 *   get:
 *     summary: 추억 앨범 상세 조회
 *     tags: [Memories]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *       - in: path
 *         name: memoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 추억 ID
 *     responses:
 *       200:
 *         description: 추억 상세 조회 성공
 */
const getMemoryDetail = async (req, res) => {
  const { userId, memoryId } = req.params;
  
  if (!userId || !memoryId) {
    return resSend(res, {
      result: false,
      error: ['userId and memoryId are required'],
      memoryId: null,
      courseId: null,
      activityDate: null,
      imageUrl: null,
      mothersQuote: null,
      myFeeling: null,
      created: null,
      updated: null
    });
  }

  try {
    const memory = await getMemoryById(userId, memoryId);
    if (memory) {
      resSend(res, {
        result: true,
        error: [],
        ...memory
      });
    } else {
      resSend(res, {
        result: false,
        error: ['Memory not found'],
        memoryId: null,
        courseId: null,
        activityDate: null,
        imageUrl: null,
        mothersQuote: null,
        myFeeling: null,
        created: null,
        updated: null
      });
    }
  } catch (error) {
    console.log(error);
    resSend(res, {
      result: false,
      error: ['Database Error'],
      memoryId: null,
      courseId: null,
      activityDate: null,
      imageUrl: null,
      mothersQuote: null,
      myFeeling: null,
      created: null,
      updated: null
    });
  }
  
  consoleBar();
  timeLog(`[GET] /memory/${userId}/${memoryId} Get memory detail called`);
};

export { getMemories, getMemoryDetail };
