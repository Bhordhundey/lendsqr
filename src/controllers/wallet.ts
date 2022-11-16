import { Request, Response } from "express";
import {
  IFundWalletModel,
  IFundWithdrawalModel,
  IWalletTransferModel,
} from "../models/dto/wallet";
import { sendError, sendSuccess } from "../util/common";
import walletService from "../service/wallet";
import validate from "../util/validations/validator";
import { accountSchemas } from "../util/validations/validationSchemas/account.schema";

export const fundWallet = async (request: Request, response: Response) => {
  try {
    // Validate the request
    const { errors, data } = validate(accountSchemas.fundWalletSchema, request.body);

    // Return error if the validation fails
    if (errors) {
      return sendError({ response, errors });
    }
    const { isSuccess, message, wallet } = await walletService.fundWallet(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        data: {
          walletRef: wallet.wallet_ref,
          availableBalance: wallet.available_balance,
          ledgerBalance: wallet.ledger_balance,
        },
        message,
      });
    }

    return sendError({ response, message });
  } catch (error) {
    const { message } = error;
    return sendError({ response, message });
  }
};

export const fundWithdrawal = async (request: Request, response: Response) => {
  try {
    // Validate the request
    const { errors, data } = validate(
      accountSchemas.fundWithdrawalSchema,
      request.body
    );

    // Return error if the validation fails
    if (errors) {
      return sendError({ response, errors });
    }
    const userId = request.currentUser?.userId;
    const payload: IFundWithdrawalModel = {
      userId,
      amount: data.amount,
    };
    const { isSuccess, message, wallet } = await walletService.fundWithdrawal(
      payload
    );
    if (isSuccess) {
      return sendSuccess({
        response,
        data: {
          walletRef: wallet.wallet_ref,
          availableBalance: wallet.available_balance,
          ledgerBalance: wallet.ledger_balance,
        },
        message,
      });
    }

    return sendError({ response, message });
  } catch (error) {
    const { message } = error;
    return sendError({ response, message });
  }
};

export const fundTransfer = async (request: Request, response: Response) => {
  try {
        // Validate the request
        const { errors, data } = validate(
            accountSchemas.fundTransferSchema,
            request.body
          );
      
          // Return error if the validation fails
          if (errors) {
            return sendError({ response, errors });
          }
    const user = request?.currentUser;
    
    const payload: IWalletTransferModel = {
      amount: data.amount,
      recipientWalletRef: data.recipientWalletRef,
      sourceAccountUserId: user?.userId,
    };

    const { isSuccess, message } = await walletService.fundTransfer(payload);

    if (isSuccess) {
      return sendSuccess({ response, message });
    }
    return sendError({ response, message });
  } catch (error) {
    const { message } = error;
    return sendError({ response, message });
  }
};

export const getWalletDetails = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.currentUser?.userId;
    const { isSuccess, message, wallet } = await walletService.getWalletDetails(
      Number(userId)
    );

    if (isSuccess) {
      return sendSuccess({ response, data: wallet, message });
    }
    return sendError({ response, message });
  } catch (error) {
    const { message } = error;
    return sendError({ response, message });
  }
};
