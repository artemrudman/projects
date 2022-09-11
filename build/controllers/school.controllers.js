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
const school_service_1 = require("../services/school.service");
const request_helper_1 = require("../helpers/request.helper");
const response_helper_1 = require("../helpers/response.helper");
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
        // ToDO: Error handling
    }
    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    }
    else {
        // TODO: Error handling
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
        // TODO: Error handling
    }
});
const updateStoreName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.getStoreName(numericParamOrError)
                .then((result) => {
                return res.status(200).json({
                    result
                });
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
// const updatePost = async (req: Request, res: Response, next: NextFunction) => {
//     // get the post id from the req.params
//     let id: number = req.params.id;
//     // get the data from req.body
//     let store_name: string = req.body.title ?? null;
//     // let body: string = req.body.body ?? null;
//     // update the post
//     // let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     //     ...(title && { title }),
//     //     ...(body && { body })
//     // });
//     // // return response
//     // return res.status(200).json({
//     //     message: response.data
//     // });
// };
exports.default = { getStoreNames, getStoreName, updateStoreName };
