import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/dto/user";
import config from "../config/config";
import db from "../config/db/db";

class AuthService {
  async generateToken(email: string) {
    
    const user: UserModel = await db<UserModel>("user")
      .select()
      .where({ email })
      .first();

    if (!user) {
      return {
        isSuccess: false,
        message: "User does not exist",
      };
    }
    const token = await jwt.sign(
      { email, userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expires }
    );
    
    return {
      isSuccess: true,
      token
    };
  }

  async decodeToken(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
     const jsonPayload = Buffer.from(base64, "base64").toString();
    return JSON.parse(jsonPayload);
  };

  async requireAuth(request: Request) {
    let token: any = request.headers["authorization"];
    if (!token) {
      return {
        isSuccess: false,
        message: "Invalid Token",
      };
    }
    token =
      token.includes("Bearer") !== undefined
        ? token.replace("Bearer", "").trim()
        : token;

    const tokenExpTime = token.exp;
    const currentTime = Math.round(new Date().getTime() / 1000);
    if (tokenExpTime < currentTime) {
      return {
        isSuccess: false,
        message: "Token Expired! Please login again",
      };
    }

    const decodedToken = await this.decodeToken(token);

    const user: UserModel = await db<UserModel>('user')
      .select()
      .where({email: decodedToken.email})
      .first();

    if (!user) {
      return {
        isSuccess: false,
        message: "Unauthorized User"
      }
    }

    if (decodedToken) {
      return {
        isSuccess: true,
        decodedToken,
      };
    }
    return {
      isSuccess: false,
      message: "Not Authorized",
    };
  }
}

export default new AuthService();
