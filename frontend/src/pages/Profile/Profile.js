import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Profile.css';

import { uploads } from '../../utils/config';

import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

import { getUserDetails } from '../../slices/userSlice';
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatephoto,
} from '../../slices/photoSlice';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
    success: successPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleResetMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();
    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );
    dispatch(publishPhoto(formData));
    handleResetMessage();
  };

  const handleFile = (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    handleResetMessage();
  };

  const hideOrShowEditForm = () => {
    newPhotoForm.current.classList.toggle('hide');
    editPhotoForm.current.classList.toggle('hide');
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains('hide')) {
      hideOrShowEditForm();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };
    console.log(photoData);
    dispatch(updatephoto(photoData));
    handleResetMessage();
  };

  const handleCancelEdit = (id) => {
    hideOrShowEditForm();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id='profile'>
      <div className='profile-header'>
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className='profile-description'>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className='new-photo' ref={newPhotoForm}>
            <h3>Share your pets!</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Title:</span>
                <input
                  type='text'
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ''}
                />
              </label>
              <label>
                <span>Photo:</span>
                <input type='file' onChange={handleFile} />
              </label>
              {!loadingPhoto ? (
                <input type='submit' value='Publish' />
              ) : (
                <input type='submit' disabled value='Loading...' />
              )}
              {errorPhoto && <Message msg={errorPhoto} type='error' />}
              {successPhoto && messagePhoto && (
                <Message msg={messagePhoto} type='success' />
              )}
            </form>
          </div>
          <div className='edit-photo hide' ref={editPhotoForm}>
            <p>Editing:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Title'
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ''}
              />
              <input type='submit' value='Save' onClick={handleUpdate} />
              <button className='cancel-btn' onClick={handleCancelEdit}>
                Cancel
              </button>
              {errorPhoto && <Message msg={errorPhoto} type='error' />}
              {successPhoto && messagePhoto && (
                <Message msg={messagePhoto} type='success' />
              )}
            </form>
          </div>
        </>
      )}
      <div className='user-photos'>
        <h2>Published photos</h2>
        <div className='photos-container'>
          {photos &&
            photos?.map((photo) => (
              <div className='photo' key={photo._id}>
                {photo?.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className='actions'>
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className='btn' to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>No photos yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
