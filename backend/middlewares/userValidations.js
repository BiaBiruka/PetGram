const { body } = require('express-validator');

// Cria as validações de cadastro. Por exemplo, se o nome de usuário não for uma string,
// retorna um erro com a mensagem informada
const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter pelo menos 3 caracteres'),
    body('email')
      .isString()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage('Email inválido'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatória')
      .isLength({ min: 8 })
      .withMessage('A senha precisa ter pelo menos 8 caracteres'),
    body('confirmPassword')
      .isString()
      .withMessage('Você precisa confirmar sua senha')
      // Validação customizada para comparar se as duas senhas são iguais
      // value - valor desse campo; req.body.[campo] é o valor do outro campo
      // retorna erro ou true
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('As senhas devem ser iguais');
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body('email')
      .isString()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage('Email inválido'),
    body('password').isString().withMessage('A senha é obrigatória'),
  ];
};

module.exports = { userCreateValidation, loginValidation };
