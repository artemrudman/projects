import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants';
import { systemError, store } from '../entities';
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
        // TODO: Error handling
    }
   
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

 };

export default { getStoreNames, getStoreName};