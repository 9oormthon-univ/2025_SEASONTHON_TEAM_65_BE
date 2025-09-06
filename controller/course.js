import * as courseRepository from '../repository/course.js';

const getCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (isNaN(parseInt(courseId))) {
        return res.status(400).json({ status: "error", message: "Invalid course ID" });
        }

        const course = await courseRepository.getCourse(courseId);

        if (!course) {
        return res.status(404).json({ status: "error", message: "Course not found" });
        }
        
        return res.status(200).json(course);

    } catch (error) {
        console.error('Error in getCourse controller:', error);
        return res.status(500).json({ status: "error", message: "Failed to fetch course" });
    }
};

export { getCourse };