import { Router } from 'express';
const router = Router();

router.use('/user', require('./userRoutes'));
router.use('/section', require('./sectionRoutes'));
router.use('/question', require('./questionRoutes'));
router.use('/answer', require('./answerRoutes'));
router.use('/userInfo', require('./userInfoRoutes'));

module.exports = router;