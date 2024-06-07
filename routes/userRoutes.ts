/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';
const router = Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);

module.exports = router; 