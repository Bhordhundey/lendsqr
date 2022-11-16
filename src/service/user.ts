
import { generateWalletRef } from '../util/common';
import { IUser, UserModel } from '../models/dto/user';
import db from '../config/db/db';
import walletService from '../service/wallet';

  const createUser = async (data: IUser): Promise<{ isSuccess: boolean; user?: any; wallet?: any, message?: string }> => {
    const isEmailExist: UserModel = await db<UserModel>('user')
      .select()
      .where({email: data.email})
      .first();

      if (isEmailExist) {
        return {
          isSuccess: false,
          message: "Email already exist"
        }
      }

    const [id] = await db('user')
    .insert({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
    })

   const user: UserModel = await db<UserModel>('user')
      .select()
      .where({id})
      .first();

    if (!user) {
      return { isSuccess: false, message: "Unable to create user details, try again"}
    }

    const walletPayload = {
      walletRef: generateWalletRef(),
      userId: user.id
    }

    const {isSuccess, wallet} = await walletService.createWallet(walletPayload);

    if (!isSuccess) {
      return { isSuccess: false, message: "Unable to create wallet details, try again"}
    }
    
    return {
      isSuccess: true,
      message: "Request Successful",
      user,
      wallet
    }
  }


export default {createUser};
