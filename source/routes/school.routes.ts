import express from 'express';
import { isJSDocLinkLike, isJSDocUnknownTag } from 'typescript';
import controller from '../controllers/school.controllers';

const router = express.Router();

router.get('/general/board-types', controller.getStoreNames);
router.get('/general/board-type/:id', controller.getStoreName);
router.put('/general/board-type/:id', controller.updateStoreName);
router.post('/general/board-type', controller.addStoreName);
router.delete('/general/board-type/:id', controller.deleteStoreNameById);

export default { router };