const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Gerar token de usuário
const generateToken = (id) => {
  // Faz a autenticação passando o id e o secret do .env
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d', // Autenticacão dura 7 dias
  });
};

// Cadastro e login
const register = async (request, response) => {
  response.send('Registro');
};

module.exports = {
  register,
};
