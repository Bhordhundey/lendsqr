
import { generateWalletRef } from '../util/common';
import userDAO from '../dao/user';
import walletDAO from '../dao/wallet';
import { IUser, UserModel } from '../models/dto/user';
import db from '../config/db/db';
import walletService from '../service/wallet';

class UserService {
  async createUser(data: IUser) {
    const [id] = await db('user')
    .insert({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
    })
     
   const user: UserModel = await db<UserModel>('user')
      .select()
      .from('user')
      .where({id})
      .first();


    if (!user) {
      return { isSuccess: false, message: "Unable to create user details, try again"}
    }

    const walletPayload = {
      walletRef: generateWalletRef(),
      userId: user.id
    }

    const wallet = await walletService.createWallet(walletPayload);

    if (!wallet) {
      return { isSuccess: false, message: "Unable to create wallet details, try again"}
    }
    
    return {
      isSuccess: true,
      message: "Request Successful",
      user,
      wallet
    }
  }
}

export default new UserService();
