import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoute from '../routes-nav/PrivateRoute';

const MyRoutes = ({ login, signup }) => {
  console.debug(
    'MyRoutes',
    `login=${typeof login}`,
    `register=${typeof register}`
  );
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/login" element={<LoginForm login={login} />} />
      <Route exact path="/signup" element={<SignupForm signup={signup} />} />
      <Route element={<PrivateRoute />}>
        <Route exact path="profile" element={<ProfileForm />} />
        <Route exact path="companies" element={<CompanyList />} />
        <Route exact path="companies/:handle" element={<CompanyDetail />} />
        <Route exact path="jobs" element={<JobList />} />
      </Route>
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default MyRoutes;
