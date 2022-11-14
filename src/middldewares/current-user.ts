import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedTokenModel, UserModel } from "src/models/dto/user";
import { sendError } from "src/util/common";




export const currentUser = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (!request.session?.jwt) {
      return next();
    }
  
    try {
      const payload = jwt.verify(
        request.session.jwt,
        process.env.JWT_KEY!
      ) as DecodedTokenModel;
      request.currentUser = payload;
    } catch (error) {
      const { message } = error;
    // Return the error message
    return sendError({ response, message });
    }
  
    next();
  };