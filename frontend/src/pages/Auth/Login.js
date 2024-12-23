import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

import { Link } from 'react-router-dom';
import Message from '../../components/Message';

import { login, reset } from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: pass,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id='login'>
      <h2>PetGram</h2>
      <p className='subtitle'>Login to view what is new.</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPass(e.target.value)}
          value={pass || ''}
        />
        {!loading ? (
          <input type='submit' value='Login' />
        ) : (
          <input type='submit' disabled value='Loading...' />
        )}
        {error && <Message msg={error} type='error' />}
      </form>
      <p>
        Not a PetGrammer yet? <Link to='/register'>Create an account now</Link>!
      </p>
    </div>
  );
};

export default Login;
