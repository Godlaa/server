/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';
const router = Router();

router.use('/user', require('./userRoutes'));
router.use('/section', require('./sectionRoutes'));
router.use('/question', require('./questionRoutes'));
router.use('/answer', require('./answerRoutes'));
router.use('/userInfo', require('./userInfoRoutes'));
router.use('/userLikes', require('./userLikesRoutes'));

module.exports = router;