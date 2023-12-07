import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../redux/authSelectors';

export const PrivateRoute = ({ redirectTo = '/auth', children }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};
