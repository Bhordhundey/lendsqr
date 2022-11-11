import { BadRequestError } from '../errors/bad-request-error';
import { IFundWalletModel, IWallet, WalletModel } from '../models/dto/wallet';
import walletDAO from '../dao/wallet';
import db from '../config/db/db';

class WalletService {
  async createWallet(walletDto: IWallet) {
    const wallet = await walletDAO.createWallet(walletDto);

    if (!wallet) {
      throw new BadRequestError("Unable to create wallet, try again");
    }
    
    return {
      isSuccess: true,
      data: wallet
    }
  }

  async fundWallet(data: IFundWalletModel) {
    const wallet =  await db<WalletModel>('wallet').select().from('wallet').where({user_id: data.userId}).first(); 
    
     if (!wallet) {
      return {
        isSuccess: false,
        message: ("Wallet does not exist for this User ")
       };
     }

     if (data.amount < 1) {
      return {
        isSuccess: false,
        message: ("Amount must be greater than 0")
       };
     }

    await db<WalletModel>('wallet')
      .where({id : wallet.id })
      .update({ 
        available_balance: wallet.available_balance + data.amount,
        ledger_balance: wallet.ledger_balance + data.amount
      });

      const walletResponse: WalletModel = await db<WalletModel>('wallet')
      .select()
      .from('wallet')
      .where({id : wallet.id})
      .first();

      if (!walletResponse){
        return {
          isSuccess: false,
          message: "Unable to fund wallet"
        }
      }
      
      return {
        isSuccess: true,
        message: "Request Successful",
        wallet: walletResponse
      }
  }
}

export default new WalletService();
