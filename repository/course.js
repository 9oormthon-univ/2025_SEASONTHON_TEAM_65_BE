import { consoleBar, timeLog } from '../config/common.js';
import { pool } from './connect.js';

/**
 * @swagger
 * /courses:
 *      get:
 *          summary: 모든 코스 정보 조회
 *          description: 데이터베이스에 저장된 모든 코스 정보를 반환합니다.
 *          tags:
 *          - Course
 *          responses:
 *              200:
 *                  description: 코스 목록 반환 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                      example: true
 *                                  error:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                  courses:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              courseId:
 *                                                  type: integer
 *                                                  description: 코스의 고유 ID
 *                                                  example: 101
 *                                              courseTitle:
 *                                                  type: string
 *                                                  description: 코스 제목
 *                                                  example: "Cooking Class"
 *                                              courseDescription:
 *                                                  type: string
 *                                                  description: 코스 상세 설명
 *                                                  example: "Learn to cook Italian dishes."
 *                                              courseImageUrl:
 *                                                  type: string
 *                                                  description: 코스 대표 이미지 URL
 *                                                  example: "https://example.com/courses/cooking.jpg"
 *                                              created:
 *                                                  type: string
 *                                                  format: date-time
 *                                                  description: 생성 일시
 *                                              updated:
 *                                                  type: string
 *                                                  format: date-time
 *                                                  description: 마지막 수정 일시
 */


// ---------[get]all course---------
const getAllCourses = async (req, res) => {
    const query = 'SELECT course_id AS courseId, course_title AS courseTitle, course_description AS courseDescription, course_image_url AS courseImageUrl, created, updated FROM DateCourses';
    const results = {};
    results.result = true;
    results.error = [];
    results.courses = [];
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query);
            results.courses = rows;
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
    timeLog('GET all-courses called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export {getAllCourses};