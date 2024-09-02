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

// Apagar foto
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    if (!photo) {
      return res.status(404).json({ errors: ['Imagem não encontrada'] });
    }
    // Checa se a foto é mesmo daquele usuário
    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(422)
        .json({ errors: ['Ocorreu um erro. Tente novamente mais tarde'] });
    }

    await Photo.findByIdAndDelete(photo._id);
    return res
      .status(200)
      .json({ id: photo._id, message: 'Imagem excluída com sucesso!' });
  } catch (error) {
    return res.status(500).json({ errors: ['Algo deu errado.'] });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
