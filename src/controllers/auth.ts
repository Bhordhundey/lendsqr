import { Request, Response } from "express";
import { sendSuccess } from "../util/common";
import authService from "../service/auth"

export const getAuthToken = async (request: Request, response: Response) => {
    const { email } = request.body;
    const token = await authService.generateToken(email);
    return sendSuccess({
        response,
        data: {
            token
        },
        message: "Request Successful"
    })
}