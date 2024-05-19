import { Router } from 'express';
const router = Router();
const sectionController = require('../controllers/sectionController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), sectionController.create);
router.get('/', sectionController.getAll);
router.get('/:id', sectionController.getOne);
router.delete('/:id', sectionController.delete);

module.exports = router;