/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';
const router = Router();
const userInfoController = require('../controllers/userInfoController');

router.post('/', userInfoController.create);
router.get('/', userInfoController.getAll);
router.get('/:userId', userInfoController.getOneByUserId);
router.delete('/:id', userInfoController.delete);
router.put('/:id', userInfoController.update);

module.exports = router;