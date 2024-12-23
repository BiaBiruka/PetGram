import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EditProfile.css';

import { uploads } from '../../utils/config';
import { profile, resetMessage } from '../../slices/userSlice';

import Message from '../../components/Message';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setPreviewImage(image);
    setImage(image);
  };

  return (
    <div id='edit-profile'>
      <h2>Edit your info</h2>
      <p className='subtitle'>Add a profile image and tell more about you!</p>

      {(user.profileImage || previewImage) && (
        <img
          className='profile-image'
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
        />
        <input type='text' placeholder='Email' disabled value={email || ''} />
        <label>
          <span>Profile image:</span>
          <input type='file' onChange={handleFile} />
        </label>
        <label>
          <span>About me:</span>
          <input
            type='text'
            placeholder='PetGram is awesome!'
            onChange={(e) => setBio(e.target.value)}
            value={bio || ''}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type='password'
            placeholder='New password'
            onChange={(e) => setPass(e.target.value)}
            value={pass || ''}
          />
        </label>
        <input type='submit' value='Save changes' />
      </form>
    </div>
  );
};

export default EditProfile;
