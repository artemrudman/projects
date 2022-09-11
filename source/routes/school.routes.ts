import express from 'express';
import controller from '../controllers/school.controllers';

const router = express.Router();

router.get('/general/board-types', controller.getStoreNames);
router.get('/general/board-type/:id', controller.getStoreName);
router.put('/general/board-type/:id', controller.updateStoreName);
//router.delete('/posts/:id', controller.deletePost);
//router.post('/posts', controller.addPost);


export default { router };