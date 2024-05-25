import { Router } from 'express';
const router = Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.create);
router.get('/', questionController.getAll);
router.get('/:id', questionController.getOne);
router.delete('/:id', questionController.delete);

module.exports = router;