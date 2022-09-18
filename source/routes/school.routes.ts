import express from 'express';
import controller from '../controllers/school.controllers';
const router = express.Router();

router.get('/general/board-types', controller.getStoreNames);
router.get('/general/board-type/:id', controller.getStoreName);
// router.get('/general/board-type-by-title/:title', controller.getStoreNameByTitle);

router.put('/general/board-type/:id', controller.updateStoreName);

router.post('/general/board-type', controller.addStoreName);
// router.post('/general/board-types2', controller.addStoreName2);

router.delete('/general/board-type/:id', controller.deleteStoreNameById);

export default { router };