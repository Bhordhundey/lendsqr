import { sendError, sendSuccess } from "../util/common";
import userService from "../service/user";
import validate from "../util/validations/validator";
import { accountSchemas } from "../util/validations/validationSchemas/account.schema";

const createAccount = async (request, response) => {
   // Validate the request
   const { errors, data } = validate(accountSchemas.createUserSchema, request.body);

     // Return error if the validation fails
     if (errors) {
      return sendError({ response, errors });
    }

  const { isSuccess, message, user, wallet } = await userService.createUser(
    data
  );

  if (isSuccess) {
    return sendSuccess({
      response,
      data: {
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          createdAt: user.created_at,
        },
        wallet: {
          walletRef: wallet.wallet_ref,
          availableBalance: wallet.available_balance,
          ledgerBalance: wallet.ledger_balance,
          isActive: wallet.is_active
        },
      },
      message,
    });
  }

  return sendError({ response, message });
};


export default {createAccount};