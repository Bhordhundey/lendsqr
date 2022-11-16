import { v4 as uuidv4 } from "uuid";
import cryptoRandomString from "crypto-random-string";import AppResponse from "../models/AppResponse";
import  HttpStatusCode  from "../models/HttpStatusCode";
 "crypto-random-string";

export const generateUUID = () => {
    return uuidv4();
}

export const generateWalletRef = (length = 12) => {
    return `wal_${cryptoRandomString({ length, type: "alphanumeric"})}`;
}

export const sendSuccess = ({ response, data = {}, message = "Request successful"}) => {
    const resp = new AppResponse({ data, message });
    return response.status(HttpStatusCode.SUCCESS).send(resp);
}

export const sendError = ({ response, errors = {}, message = "Invalid requests", code = HttpStatusCode.INVALID_REQUEST}) => {

    const resp = new AppResponse({ data: {}, message, errors });
    return response.status(code).send(resp);
}
