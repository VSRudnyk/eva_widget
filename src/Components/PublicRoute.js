import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import authSelectors from '../redux/authSelectors';

export const PublicRoute = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to='/widget' /> : children;
};
