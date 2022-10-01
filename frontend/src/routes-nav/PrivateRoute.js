import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../auth/UserContext';

const PrivateRoute = ({ exact, path }) => {
  const { currentUser } = useContext(UserContext);
  console.debug(
    'PrivateRoute',
    'exact=',
    exact,
    'path=',
    path,
    'currentUser=',
    currentUser
  );

  // ! V5 router way we did this, outdated in V6
  // if (!currentUser) {
  // return <NavLink to="/login">Log in</NavLink>;
  //   return (
  //     <Route exact={exact} path={path}>
  //       {children}
  //     </Route>
  //   );
  // }

  // return (
  //   <Route exact={exact} path={path}>
  //     {children}
  //   </Route>
  // );

  // * V6 router does it this way with built in Outlet component and Navigate component.
  // * This is due to the fact that we now only have Routes component with a nested route component, this is to replace the Switch component in V5 router.

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
