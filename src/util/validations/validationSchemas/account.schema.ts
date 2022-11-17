import * as Joi from 'joi';

const emailSchema = Joi.string().required().email().trim().label('Email').messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required',
  });



const accountSchemas = {
    createUserSchema: Joi.object().keys({
    firstName: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('First name'),
    lastName: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('Last name'),
    email: Joi.string().required().email().trim().label('Email').messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required',
  }),
}),

getTokenSchema: Joi.object().keys({
  email: Joi.string().required().email().trim().label('Email').messages({
  'string.email': 'Invalid email',
  'any.required': 'Email is required',
}),
}),

  fundWalletSchema: Joi.object().keys({
    amount: Joi.number()
      .required()
      .label('Amount'),
  }),

  fundTransferSchema: Joi.object().keys({
    recipientWalletRef: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('Recipient Wallet ref'),
    amount: Joi.number()
      .required()
      .label('Amount'),
  }),

  fundWithdrawalSchema: Joi.object().keys({
    amount: Joi.number()
      .required()
      .label('Amount'),
  }),


  validateOptions: {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  },

};

export { accountSchemas };
