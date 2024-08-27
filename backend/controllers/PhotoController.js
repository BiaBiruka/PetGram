const Photo = require('../models/Photo');
const User = require('../models/User');
const mongoose = require('mongoose');

// Inserir imagem com usuário relacionado à ela
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Cria a foto
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // Se criou com sucesso, retorna
  if (!newPhoto) {
    res.status(422).json({ errors: ['Houve um problema ao inserir a imagem'] });
  }

  res.status(201).json(newPhoto);

  res.send('Foto inserida');
};

module.exports = {
  insertPhoto,
};
