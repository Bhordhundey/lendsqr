const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
import * as assert from 'assert';
import { resetStubAndSpys } from '../testHelper';
import * as userMock from './mocks/user.mock';
import userController from '../../controllers/user';
import  HttpStatusCode  from '../../models/HttpStatusCode';

describe('User Controller', () => {
    const sandBox = sinon.createSandbox();
    afterEach(() => {
      resetStubAndSpys([sandBox]);
    });
    beforeEach(() => {
      resetStubAndSpys([sandBox]);
    });

    it('Create Account  - invalid request : 400', async () => {
        const request = { body: {} };
        const response = httpMocks.createResponse();
        await userController.createAccount(request, response);
        const responseData = response._getData();
        assert.deepStrictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
        assert.deepStrictEqual(responseData.message, 'Invalid requests');
        assert.ok(Object.keys(responseData.errors).length > 2);
        assert.ok('email' in responseData.errors);
        assert.ok('firstName' in responseData.errors);
        assert.ok('lastName' in responseData.errors);
      });
    it('Create Account  - succesful :200', async () => {
        const request = { body: userMock.createAccountMockRequest };
        const response = httpMocks.createResponse();
        await userController.createAccount(request, response); 
        const responseData = response._getData();
        assert.deepStrictEqual(response.statusCode, HttpStatusCode.SUCCESS);
        assert.deepStrictEqual(responseData.message, 'Request Successful');
        assert.deepStrictEqual(Object.keys(responseData.errors).length, 0);
        assert.ok('data' in responseData);
      });
      it('Create Account  - Email already exist :400', async () => {
        const request = { body: userMock.createAccountMockRequest };
        const response = httpMocks.createResponse();
        await userController.createAccount(request, response); 
        const responseData = response._getData();
        assert.deepStrictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
        assert.deepStrictEqual(responseData.message, 'Email already exist');
        assert.deepStrictEqual(Object.keys(responseData.errors).length, 0);
        assert.ok(responseData.message);
      });
});