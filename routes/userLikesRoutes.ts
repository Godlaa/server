/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';
const userLikesController = require('../controllers/userLikesController');
const router = Router();

router.post('/', userLikesController.create);
router.get('/', userLikesController.getAll);
router.get('/:id', userLikesController.getOne);
router.delete('/:id', userLikesController.delete);

module.exports = router; 