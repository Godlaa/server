import ApiError from '../error/ApiError';
import { Response } from 'express';

module.exports = function(err: ApiError, res : Response) {
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message});
    }
    return res.status(500).json({message: 'Unexpected error'});
}