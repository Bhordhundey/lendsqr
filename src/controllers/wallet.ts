import { Request, Response } from "express";
import { IFundWalletModel } from "src/models/dto/wallet";
import { sendError, sendSuccess } from "../util/common";
import walletService from '../service/wallet';


export const fundWallet = async (request: Request, response: Response) => {
    const { userId, amount } = request.body
    const payload: IFundWalletModel = {
        userId,
        amount
    }
    const { isSuccess, message, wallet} = await walletService.fundWallet(payload);
    if (isSuccess) {
        return sendSuccess({
            response, 
            data: {
                walletRef: wallet.wallet_ref,
                availableBalance: wallet.available_balance,
                ledgerBalance: wallet.ledger_balance
            }, 
            message})
    }

    return sendError({ response, message});
}
