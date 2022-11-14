import { Request, Response, NextFunction } from "express";
import { sendError } from "../util/common";
import authService from "../service/auth"
import { DecodedTokenModel } from "src/models/dto/user";

declare global {
    namespace Express {
      interface Request {
        currentUser?: DecodedTokenModel;
      }
    }
  }

export const requireAuth = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
        const { isSuccess, message, decodedToken } = await authService.requireAuth(request);
        
        if (isSuccess) {
            request.currentUser = decodedToken;
            return next();  
        }
        return sendError({ response, message, code: 401  });

    } 
    catch (error) {
    const { message } = error;
    return sendError({ response, message, code: 401  });
    }
  };