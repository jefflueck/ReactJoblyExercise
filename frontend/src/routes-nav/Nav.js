import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';

const Nav = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/companies">
          Companies
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/jobs">
          Jobs
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={logout}>
          Log out {currentUser.first_name || currentUser.username}
        </NavLink>
      </li>
    </ul>
  );

  const loggedOutNav = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">
          Sign up
        </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
};

export default Nav;
