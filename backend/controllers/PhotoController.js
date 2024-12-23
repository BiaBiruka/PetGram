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
    res.status(422).json({ errors: ['Something went wrong while trying to add image.'] });
  }

  res.status(201).json(newPhoto);

  res.send('Image added.');
};

// Apagar foto
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    if (!photo) {
      return res.status(404).json({ errors: ['Photo not found.'] });
    }
    // Checa se a foto é mesmo daquele usuário
    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(422)
        .json({ errors: ['Something went wrong. Please try again later.'] });
    }

    await Photo.findByIdAndDelete(photo._id);
    return res
      .status(200)
      .json({ id: photo._id, message: 'Photo deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ errors: ['Something went wrong.'] });
  }
};

// Busca todas as fotos
const getAllPhotos = async (req, res) => {
  // Filtra pra exibir os mais recentes primeiro
  const photos = await Photo.find({})
    .sort([['createdAt', -1]])
    .exec();

  return res.status(200).json(photos);
};

// Pega as fotos daquele usuário
const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([['createdAt', -1]])
    .exec();

  return res.status(200).json(photos);
};

// Pegar fotos por ID
const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ erros: ['Photo not found.'] });
    return;
  }

  res.status(200).json(photo);
};

// Alterar foto (na verdade só o título)
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ erros: ['Photo not found.'] });
    return;
  }

  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ['Something wwent wrong. Please try again later.'] });
    return;
  }

  if (title) {
    photo.title = title;
    await photo.save();
  }
  res.status(200).json({ photo, message: 'Photo updates successfully!' });
};

// Like na foto
const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ erros: ['Photo not found.'] });
    return;
  }

  // Checa se já curtiu a foto
  // TODO: função de remover o like
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["You've already liked this photo."] });
    return;
  }

  photo.likes.push(reqUser._id);
  photo.save();
  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: 'Photo liked!' });
};

// Comentar foto
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;
  const photo = await Photo.findById(id);
  const user = await User.findById(reqUser._id);

  if (!photo) {
    res.status(404).json({ erros: ['Photo not found.'] });
    return;
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };
  photo.comments.push(userComment);
  await photo.save();
  res.status(200).json({ userComment, message: 'Comment posted!' });
};

// Buscar imagem pelo título
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  // Argumento "q" (query do que se procura) está em algum lugar da string
  const photos = await Photo.find({ title: new RegExp(q, 'i') }).exec();
  return res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
