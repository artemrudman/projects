"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const school_controllers_1 = __importDefault(require("../controllers/school.controllers"));
const router = express_1.default.Router();
router.get('/general/board-types', school_controllers_1.default.getStoreNames);
router.get('/general/board-type/:id', school_controllers_1.default.getStoreName);
// router.get('/general/board-type-by-title/:title', controller.getStoreNameByTitle);
router.put('/general/board-type/:id', school_controllers_1.default.updateStoreName);
router.post('/general/board-type', school_controllers_1.default.addStoreName);
// router.post('/general/board-types2', controller.addStoreName2);
router.delete('/general/board-type/:id', school_controllers_1.default.deleteStoreNameById);
exports.default = { router };
