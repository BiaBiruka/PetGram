const { body } = require('express-validator');

// Cria as validações de cadastro. Por exemplo, se o nome de usuário não for uma string,
// retorna um erro com a mensagem informada
const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('Name cannot be empty.')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long.'),
    body('email')
      .isString()
      .withMessage('Email cannot be empty.')
      .isEmail()
      .withMessage('Email invalid.'),
    body('password')
      .isString()
      .withMessage('Password cannot be empty.')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.'),
    body('confirmPassword')
      .isString()
      .withMessage('You have to confirm your password.')
      // Validação customizada para comparar se as duas senhas são iguais
      // value - valor desse campo; req.body.[campo] é o valor do outro campo
      // retorna erro ou true
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passowords must match.');
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body('email')
      .isString()
      .withMessage('Email cannot be empty.')
      .isEmail()
      .withMessage('Email invalid.'),
    body('password').isString().withMessage('Password cannot be empty.'),
  ];
};

const userUpdateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('Name cannot be empty.')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long.'),
    body('password')
      .optional()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.'),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
