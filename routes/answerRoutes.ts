import { Router } from 'express';
const router = Router();
const answerController = require('../controllers/answerController');

router.post('/', answerController.create);
router.get('/', answerController.getAll);
router.get('/:id', answerController.getOne);
router.delete('/:id', answerController.delete);

module.exports = router;