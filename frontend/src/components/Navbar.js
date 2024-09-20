import React from 'react';
import './navbar.css';

import { NavLink, Link } from 'react-router-dom';
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav id='nav'>
      <Link to='/'>PetGram</Link>
      <form id='search-form'>
        <BsSearch id='search-form-svg' />
        <input type='text' placeholder='Search' id='search-input' />
      </form>
      <ul id='nav-links'>
        <li>
          <NavLink to='/'>
            <BsHouseDoorFill />
          </NavLink>{' '}
        </li>
        <li>
          <NavLink to='/login'>Login</NavLink>{' '}
        </li>
        <li>
          <NavLink to='/register'>Register</NavLink>{' '}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
