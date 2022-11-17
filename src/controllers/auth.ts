import { Request, Response } from "express";
import { sendError, sendSuccess } from "../util/common";
import authService from "../service/auth";
import validate from "../util/validations/validator";
import { accountSchemas } from "../util/validations/validationSchemas/account.schema";

export const getAuthToken = async (request: Request, response: Response) => {
  // Validate the request
  const { errors, data } = validate(
    accountSchemas.getTokenSchema,
    request.body
  );

  // Return error if the validation fails
  if (errors) {
    return sendError({ response, errors });
  }

  const { isSuccess, message, token } = await authService.generateToken(data.email);

if (isSuccess) {
      return sendSuccess({
    response,
    data: {
      token,
    },
    message: "Request Successful",
  });
}
return sendError({ response, message });

};
