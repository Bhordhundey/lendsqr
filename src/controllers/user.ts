import { Request, Response } from "express";
import { IUser } from "../models/dto/user";
import { sendError, sendSuccess } from "../util/common";
import { BadRequestError } from "../errors/bad-request-error";
import userService from '../service/user';


export const createAccount = async (request: Request, response: Response) => {
      const { firstName, lastName, email } = request.body;

      const payload: IUser = {
        firstName,
        lastName,
        email
      }

    const { isSuccess, message, user, wallet } = await userService.createUser(payload);
      if (isSuccess) {
        return sendSuccess({response, data: {user, wallet}, message})
      }
      
      return sendError({ response, message})
  
}