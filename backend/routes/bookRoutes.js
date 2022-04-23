import express from 'express';
import { getBooks, getBooksById } from '../controller/bookController.js';

const router = express.Router()

router.route('/').get(getBooks)

router.route('/:id').get(getBooksById)



export default router