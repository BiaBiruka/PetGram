import { api, requestConfig } from '../utils/config';

const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true);

  try {
    const res = await fetch(`${api}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserPhotos = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deletePhoto = async (id, token) => {
  const config = requestConfig('DELETE', null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPhotoById = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const likePhoto = async (id, token) => {
  const config = requestConfig('PUT', null, token);

  try {
    const res = await fetch(`${api}/photos/like/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const commentPhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${api}/photos/comment/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllPhotos = async (token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchPhoto = async (query, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/search?q=${query}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhotoById,
  likePhoto,
  commentPhoto,
  getAllPhotos,
  searchPhoto,
};

export default photoService;
