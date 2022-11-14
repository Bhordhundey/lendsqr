export interface IUser {
    firstName: string;
    lastName: string;
    email: string
}

export interface UserModel {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string
}

export interface DecodedTokenModel {
    email: string;
    userId: number;
    iat: string;
    exp: string;
  }