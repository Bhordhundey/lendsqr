import db from "../config/db/db";
import { IUser, UserModel } from "../models/dto/user";

class UserDAO {
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
    return user;
  }
}

export default new UserDAO();
