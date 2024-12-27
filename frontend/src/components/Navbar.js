import React from 'react';
import './navbar.css';

import { NavLink, Link } from 'react-router-dom';
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from 'react-icons/bs';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout, reset } from '../slices/authSlice';

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id='nav'>
      <Link to='/'>PetGram</Link>
      <form id='search-form' onSubmit={handleSearch}>
        <BsSearch id='search-form-svg' />
        <input
          type='text'
          placeholder='Search'
          id='search-input'
          onChange={(e) => setQuery(e.target.value)}
          value={query || ''}
        />
      </form>
      <ul id='nav-links'>
        {auth ? (
          <>
            <li>
              <NavLink to='/'>
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to='/profile'>
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Logout</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
