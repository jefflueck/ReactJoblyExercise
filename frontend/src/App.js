import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes-nav/MyRoutes';
import Nav from './routes-nav/Nav';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api/api';
// import jwt from 'jsonwebtoken';
import { decodeToken } from 'react-jwt';

export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    'App',
    'infoLoaded=',
    infoLoaded,
    'applicationIds=',
    applicationIds,
    'currentUser=',
    currentUser,
    'token=',
    token
  );

  useEffect(
    function loadUserInfo() {
      console.debug('App useEffect loadUserInfo', 'token=', token);
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decodeToken(token);
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error('App loadUserInfo: problem loading', err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Hello</h1>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: { username: 'testuser' } }}>
          <Nav logout={logout} />
          <MyRoutes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
