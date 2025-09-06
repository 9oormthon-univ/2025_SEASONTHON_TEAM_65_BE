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
/**
 * @swagger
 * /course/{course_id}:
 *      get:
 *          summary: 특정 ID의 코스 상세 정보 조회
 *          description: URL 경로에 포함된 course_id를 사용하여 특정 코스의 상세 정보를 반환합니다.
 *          tags: [Course]
 *          parameters:
 *          - in: path
 *            name: course_id
 *            required: true
 *            description: 조회할 코스의 고유 ID
 *            schema:
 *              type: integer
 *          responses:
 *            200:
 *              description: 코스 상세 정보 조회 성공
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      courseTitle:
 *                        type: string
 *                        example: "Painting Workshop"
 *                      courseDescription:
 *                        type: string
 *                        example: "Learn watercolor painting."
 *                      courseTag:
 *                        type: integer
 *                        example: 4
 *                      courseImageUrl:
 *                        type: string
 *                        example: "https://example.com/courses/painting.png"
 *                      courseSchedule:
 *                        type: string
 *                        example: "Sundays 2PM"
 *                      created:
 *                        type: string
 *                        format: date-time
 *                      updated:
 *                        type: string
 *                        format: date-time
 *          400:
 *            description: 잘못된 ID 형식
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: error
 *                    message:
 *                      type: string
 *                      example: Invalid course ID
 *          404:
 *            description: 코스를 찾을 수 없음
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: error
 *                    message:
 *                      type: string
 *                      example: Course not found
 *          500:
 *            description: 서버 내부 오류
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

// ---------[get]course by id---------
const getCourse = async (courseId) => {
    const query = `
        SELECT
        course_title AS courseTitle,
        course_description AS courseDescription,
        course_tag AS courseTag,
        course_image_url AS courseImageUrl,
        course_schedule AS courseSchedule,
        created,
        updated
        FROM DateCourses
        WHERE course_id = ?
    `;

    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(query, [courseId]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error finding course by ID:', error);
        throw error;
    } finally {
        connection.release();
    }
};

export {getAllCourses, getCourse};