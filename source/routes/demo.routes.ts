import express from 'express';
import controller from '../controllers/demo.controllers';
const router = express.Router();

router.get('/demo/hello-world', controller.getHelloWorld);
router.get('/demo/timeout', controller.getWithTimeOut);
router.get('/demo/delay/:seconds', controller.getWithDelay);
router.get('/demo/delay-validated/:seconds', controller.getWithDelayValidated);

export =  router;