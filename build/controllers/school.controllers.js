"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const request_helper_1 = require("../helpers/request.helper");
const response_helper_1 = require("../helpers/response.helper");
const school_service_1 = require("../services/school.service");
const schoolService = new school_service_1.SchoolService();
const getStoreNames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    schoolService.getStoreNames()
        .then((result) => {
        return res.status(200).json({
            message: result
        });
    })
        .catch((error) => {
        switch (error.code) {
            case constants_1.ErrorCodes.ConnectionError:
                return res.status(408).json({
                    errorMessage: error.message
                });
            case constants_1.ErrorCodes.queryError:
                return res.status(406).json({
                    errorMessage: error.message
                });
            default:
                return res.status(400).json({
                    errorMessage: error.message
                });
        }
    });
});
const getStoreName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = -1;
    const sId = req.params.id;
    if (isNaN(Number(req.params.id))) {
    }
    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    }
    else {
    }
    if (id > 0) {
        schoolService.getStoreName(id)
            .then((result) => {
            return res.status(200).json({
                result
            });
        })
            .catch((error) => {
            switch (error.code) {
                case constants_1.ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case constants_1.ErrorCodes.queryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
        });
    }
    else {
    }
});
const updateStoreName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body = req.body;
            schoolService.updateStoreName({
                id: numericParamOrError,
                store_name: body.store_name
            })
                .then((result) => {
                return res.status(200).json(result);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
const deleteStoreNameById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.deleteStoreNameById(numericParamOrError)
                .then(() => {
                return res.sendStatus(200);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
const addStoreName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    schoolService.addStoreName({
        id: constants_1.NON_EXISTENT_ID,
        store_name: body.store_name
    })
        .then((result) => {
        console.log('Я тут1!');
        return res.status(200).json(result);
    })
        .catch((error) => {
        console.log('Я тут2!');
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
    console.log('Я тут3!');
});
exports.default = { getStoreNames, getStoreName, updateStoreName, deleteStoreNameById, addStoreName };
