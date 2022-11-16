const sinon = require('sinon');
import * as assert from 'assert';
import userService from '../../service/user';
import walletService from '../../service/wallet';
import { resetStubAndSpys } from '../testHelper';

describe('User Service', () => {
    const sandBox = sinon.createSandbox();
    afterEach(() => {
      resetStubAndSpys([sandBox]);
    });
  
    it('#Service create user  - failure', async () => {
      const body = { email: '', firstName: '', lastName: ''};
      const { isSuccess, message, user, wallet } = await userService.createUser(body);
      assert.deepStrictEqual(isSuccess, false);
    });
});