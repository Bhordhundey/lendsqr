import * as faker from 'faker';

const createAccountMockRequest = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
  getTokenMockRequest = {
    email: faker.internet.email()
  }


export {
  createAccountMockRequest,
  getTokenMockRequest
};
