import { Request, Response } from "express";
import { IFundWalletModel, IWalletTransferModel } from "src/models/dto/wallet";
import { sendError, sendSuccess } from "../util/common";
import walletService from "../service/wallet";

export const fundWallet = async (request: Request, response: Response) => {
  try {
    const { walletRef, amount } = request.body;
    const payload: IFundWalletModel = {
      walletRef,
      amount,
    };
    const { isSuccess, message, wallet } = await walletService.fundWallet(
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
    const { amount, recipientWalletRef } = request.body;
    const user = request?.currentUser;
    const payload: IWalletTransferModel = {
      amount,
      recipientWalletRef,
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

export const getWalletDetails = async (request: Request, response: Response) => {
    try {
        const { userId } = request.params;    
        const { isSuccess, message, wallet } = await walletService.getWalletDetails(Number(userId));
        
        if (isSuccess) {
          return sendSuccess({ response, data: wallet, message });
        }
        return sendError({ response, message });
      } catch (error) {
        const { message } = error;
        return sendError({ response, message });
      }
};
