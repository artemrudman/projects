import { Request, Response, NextFunction } from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    return res.status(200).json({
        message: "Hello world!"
    });
};

const getWithTimeOut = async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {    
        return res.status(200).json({
            message: "Timeout in 1 second"
        });
    }, 1000);
};

const getWithDelay = async (req: Request, res: Response, next: NextFunction) => {
    //read .......
    let delayInSeconds: number = parseInt(req.params.delay);

    setTimeout(() => {    
        return res.status(200).json({
            message: `Timeout in ${delayInSeconds} second`
        });
    },delayInSeconds * 1000);
};

const getWithDelayValidated = async (req: Request, res: Response, next: NextFunction) => {
    // Read the delay in seconds from request parameter
    const secondsStringParameter: string = req.params.seconds;
    if (isNaN(Number(req.params.seconds))) {
        // Error response
        //return res.status(406).json({
           // error: "Incorrect seconds parameter value"
        //});

        //Error response without a massage
        return res.statusCode
    }
    else {
        // all in good: proceed
        let delayInSeconds: number = parseInt(req.params.seconds);
        setTimeout(() => {
            return res.status(200).json({ // why res in input of function??? if we return it
                message: `Timeout in ${delayInSeconds} second!`
            });
        }, delayInSeconds * 1000);
    }
};

export default { getHelloWorld, getWithTimeOut, getWithDelay, getWithDelayValidated };