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
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Checa se usuário já existe a partir do email
  // findOne() vem do mongoose
  const user = await User.findOne({ email });
  if (user) {
    res.status(422).json({ errors: ['Email já cadastrado'] });
    return;
  }

  // Caso não exista, coloca o hash na senha
  // o salt serve pra "sujar" a senha
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Cria o usuário
  // create() vem do mongoose
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // Se criou com sucesso, retorna o token baseado na função criada
  if (!newUser) {
    res.status(422)
      .json({ errors: ['Algo deu errado. Tente novamente mais tarde'] });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Login
const login = (req, res) => {
  res.send("Login")
}

module.exports = {
  register,
  login
};
