import { Request, Response, NextFunction } from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    return res.status(200).json({
        message: "Hello world!"
    });
};

export default { getHelloWorld };