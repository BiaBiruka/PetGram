const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
    res.status(422).json({ errors: ['Email already in use.'] });
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
    res
      .status(422)
      .json({ errors: ['Something went wrong. Please try again later.'] });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Checa se o usuário existe
  if (!user) {
    res.status(400).json({ errors: ['User not found.'] });
    return;
  }

  // Checa se a senha está correta
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ['Wrong password.'] });
    return;
  }

  // Se não caiu em nenhum if, retorna usuário e token assim como quando cria a conta
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Pegar usuário logado
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

// Atualizar usuário
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  // Checa se chegou algo
  if (req.file) {
    profileImage = req.file.filename;
  }
  const reqUser = req.user;

  //transforma o id do usuário em um "objeto de ID" e remove a senha pq esse request nn precisa
  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select('-password');

  if (name) {
    user.name = name;
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const passWordHash = await bcrypt.hash(password, salt);
    user.password = passWordHash;
  }
  if (profileImage) {
    user.profileImage = profileImage;
  }
  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Pegar usuário pelo ID (ver perfil de outros)
const getUserById = async (req, res) => {
  // Pega da URL pq é um get
  const { id } = req.params;

  // Checa se usuário existe
  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      '-password'
    );

    if (!user) {
      res.status(404).json({ errors: ['Usuário não encontrado'] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ['Usuário não encontrado'] });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
