import express from 'express';
import {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
} from '../controllers/bugController.js';

const router = express.Router();

router.get('/', getBugs);           // GET /api/bugs
router.post('/', createBug);        // POST /api/bugs
router.put('/:id', updateBug);      // PUT /api/bugs/:id
router.delete('/:id', deleteBug);   // DELETE /api/bugs/:id

export default router;

