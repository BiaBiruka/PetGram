const { validationResult } = require('express-validator');

// next define os próximos passos
const validate = (request, response, next) => {
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  }

  // Se deu erro, cai aqui e trata cada erro unicamente
  const extractedErrors = [];
  errors.array().map((error) => {
    extractedErrors.push(error.msg);
  });

  // 422 é de falha na requisição
  return response.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
