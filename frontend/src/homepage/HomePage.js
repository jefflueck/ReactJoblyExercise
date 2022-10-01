import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="HomePage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser ? (
          <h2>
            Welcome Back, {currentUser.first_name || currentUser.username}
          </h2>
        ) : (
          <p>
            <Link className="btn btn-primary font-weight-bold" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary font-weight-bold" to="/signup">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
