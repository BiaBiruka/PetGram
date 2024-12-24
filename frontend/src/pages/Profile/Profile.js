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

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

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
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(photos);
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
        </>
      )}
      <div className='user-photos'>
        <h2>Published photos</h2>
        {photos &&
          photos.map((photo) => {
            <div className='photo' key={photo._id}>
              {photo.image && (
                <img
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}
            </div>;
          })}
      </div>
    </div>
  );
};

export default Profile;
