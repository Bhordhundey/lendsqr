import { BadRequestError } from "..//errors/bad-request-error";
import db from "../config/db/db";
import { IFundWalletModel, IWallet, WalletModel } from "../models/dto/wallet";

class WalletDAO {
  async createWallet(data: IWallet) {
    const [id] = await db('wallet')
      .insert({
        wallet_ref: data.walletRef,
        user_id: data.userId
      })
      
     const wallet: WalletModel = await db<WalletModel>('wallet').select().from('wallet').where({id}).first();

    return wallet;
  }

  async fundWallet(data: IFundWalletModel) {
     const wallet =  await db<WalletModel>('wallet').select().from('wallet').where({user_id: data.userId}).first(); 

     if (!wallet) {
      return {
        isSuccess: false,
        message: ("Wallet does not exist for this User ")
       };
     }
    const walletResponse =  await db<WalletModel>('wallet')
      .where({user_id : data.userId })
      .update({ 
        available_balance: wallet.available_balance + data.amount,
        ledger_balance: wallet.ledger_balance + data.amount
      }, ['id', 'available_balance', 'ledger_balance']);

      console.log("===walletResponse===", walletResponse);
      
      return {
        isSuccess: true,
        message: "Request Successful",
        wallet: walletResponse
      }
  }


}

export default new WalletDAO();
