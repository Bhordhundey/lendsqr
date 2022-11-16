import { IFundWalletModel, IFundWithdrawalModel, IWallet, IWalletTransferModel, WalletModel } from '../models/dto/wallet';
import db from '../config/db/db';

  const createWallet = async (data: IWallet) => {
    const [id] = await db('wallet')
      .insert({
        wallet_ref: data.walletRef,
        user_id: data.userId
      })
     const wallet: WalletModel = await db<WalletModel>('wallet').select().from('wallet').where({id}).first();
 
    if (!wallet) {
      return {
        isSuccess: false,
        message: "Unable to create wallet, try again"
      }
    }
    
    return {
      isSuccess: true,
      wallet,
      message: "Request Successful"
    }
  }

  const fundWallet = async (data: IFundWalletModel) => {
    const wallet =  await db<WalletModel>('wallet').select().from('wallet').where({wallet_ref: data.walletRef}).first(); 
    
     if (!wallet) {
      return {
        isSuccess: false,
        message: ("Account not found for this walletRef")
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

  const fundWithdrawal = async (data: IFundWithdrawalModel) => {
    const { userId, amount } = data;
    const wallet =  await db<WalletModel>('wallet').select().from('wallet').where({user_id: userId}).first(); 
    
     if (!wallet) {
      return {
        isSuccess: false,
        message: ("Account not found")
       };
     }

     if (data.amount < 1) {
      return {
        isSuccess: false,
        message: ("Amount must be greater than 0")
       };
     }

     if (amount > wallet.available_balance) {
      return {
        isSuccess: false,
        message: "Insufficient fund"
      }
    }

    await db<WalletModel>('wallet')
      .where({user_id: wallet.id })
      .update({ 
        available_balance: wallet.available_balance - amount,
        ledger_balance: wallet.ledger_balance - amount
      });

      const walletResponse: WalletModel = await db<WalletModel>('wallet')
      .select()
      .from('wallet')
      .where({id : wallet.id})
      .first();

      if (!walletResponse){
        return {
          isSuccess: false,
          message: "Fund withrawal Failed"
        }
      }
      
      return {
        isSuccess: true,
        message: "Request Successful",
        wallet: walletResponse
      }
  }

  const fundTransfer = async (data: IWalletTransferModel) => {
    const {sourceAccountUserId, amount, recipientWalletRef} = data

    const sourceAccountWallet: WalletModel = await db<WalletModel>('wallet').select().from('wallet').where({user_id: sourceAccountUserId}).first();

    if (amount > sourceAccountWallet.available_balance) {
      return {
        isSuccess: false,
        message: "Insufficient fund"
      }
    }
    
    const recipientWallet: WalletModel = await db<WalletModel>('wallet').select().from('wallet').where({wallet_ref: recipientWalletRef}).first();
    if (!recipientWallet) {
      return {
        isSuccess: false,
        message: "Recipient wallet not found"
      }
    }

    const debitRecipient = await db<WalletModel>('wallet')
    .where({ user_id: sourceAccountUserId })
    .update({ 
      available_balance: sourceAccountWallet.available_balance - amount,
      ledger_balance: sourceAccountWallet.ledger_balance - amount
    });

    if (!debitRecipient) {
      return {
        isSuccess: false,
        message: "Transfer Error. Please try again"
      }
    }

   const walletResponse = await db<WalletModel>('wallet')
      .where({wallet_ref: recipientWalletRef })
      .update({ 
        available_balance: recipientWallet.available_balance + amount,
        ledger_balance: recipientWallet.ledger_balance + amount
      });

      if (!walletResponse){
        return {
          isSuccess: false,
          message: "Fund Transfer failed"
        }
      }
      
      return {
        isSuccess: true,
        message: "Request Successful"
      }

  }

  const getWalletDetails = async (userId: number) => {
    const wallet = await db<WalletModel>('wallet').select().from('wallet').where({user_id: userId}).first().join('user', 'user.id', 'wallet.user_id')
    .options({nestTables: true});
   
      if (!wallet) {
        return {
          isSuccess: false,
          message: "Account not found"
        }
      }
    return {
      isSuccess: true,
      message: "Request Successful",
      wallet: {
        walletRef: wallet.wallet.wallet_ref,
        availableBalance: wallet.wallet.available_balance,
        ledgerbalance: wallet.wallet.ledger_balance,
        isActive: wallet.wallet.is_active,
        userId: wallet.wallet.user_id,
        user: {
          id: wallet.user.id,
          email: wallet.user.email,
          firstName: wallet.user.first_name,
          lastName: wallet.user.last_name
        },
      }
    }
  }

export default { createWallet, fundWallet, fundTransfer, fundWithdrawal, getWalletDetails}