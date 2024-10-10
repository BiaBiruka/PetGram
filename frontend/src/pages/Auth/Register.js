import { useState, useEffect, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

// Components
import { Link } from 'react-router-dom';

// Redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id='register'>
      <h2>PetGram</h2>
      <p className='subtitle'>
        Register now and view cute pets all over the world!
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
        />
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password || ''}
        />
        <input
          type='password'
          placeholder='Confirm your password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ''}
        />
        <input type='submit' value='Submit' />
      </form>
      <p>
        Already a PetGrammer? <Link to='/login'>Login now</Link>!
      </p>
    </div>
  );
};

export default Register;
