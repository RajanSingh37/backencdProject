import { Router } from 'express';

const router = Router();

router.get('/', getAllCourses);

router.get('/', getLecturesByCourseId);

export default router;