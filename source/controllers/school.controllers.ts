import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { SchoolService } from '../services/school.service';
const schoolService: SchoolService = new SchoolService();


const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: schoolService.getBoardTypes()
    });
};


export default { getBoardTypes };