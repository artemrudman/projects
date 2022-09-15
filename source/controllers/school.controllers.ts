import { Request, Response, NextFunction } from 'express';
import { resolveProjectReferencePath } from 'typescript';
import { ErrorCodes, General, NON_EXISTENT_ID } from '../constants';
import { systemError, store } from '../entities';
import { ErrorHelper } from '../helpers/error.helper';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { SchoolService } from '../services/school.service';


const schoolService: SchoolService = new SchoolService();

const getStoreNames = async (req: Request, res: Response, next: NextFunction) => {
    schoolService.getStoreNames()
        .then((result: store[]) => {
            return res.status(200).json({
                message: result
            });
        })
        .catch((error: systemError) => {
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.queryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
        });
};

const getStoreName = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    const sId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {
    }

    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    }
    else {
    }

    if (id > 0) {
        schoolService.getStoreName(id)
            .then((result: store) => {
                return res.status(200).json({
                    result
                });
            })
            .catch((error: systemError) => {
                switch (error.code) {
                    case ErrorCodes.ConnectionError:
                        return res.status(408).json({
                            errorMessage: error.message
                        });
                    case ErrorCodes.queryError:
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
};


const updateStoreName = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: store = req.body;
            schoolService.updateStoreName({
                id: numericParamOrError,
                store_name: body.store_name
            })
                .then((result: store) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};


    const deleteStoreNameById = async (req: Request, res: Response, next: NextFunction) => {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                schoolService.deleteStoreNameById(numericParamOrError)
                    .then(() => {
                        return res.sendStatus(200);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    });
            }
            else {
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    };

    
    const addStoreName = async (req: Request, res: Response, next: NextFunction) => {
        const body: store = req.body;
    
        schoolService.addStoreName(
            {
            id: NON_EXISTENT_ID,
            store_name: body.store_name
        }
        )
            .then((result: store) => {
                console.log('Я тут1!');
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                console.log('Я тут2!');
                return ResponseHelper.handleError(res, error);
            });
        console.log('Я тут3!');
    }
    



export default { getStoreNames, getStoreName, updateStoreName, deleteStoreNameById, addStoreName };