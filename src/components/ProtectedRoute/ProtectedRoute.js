import { Navigate, Outlet } from 'react-router';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAllowed, redirectTo = '/' }) => {
  if (!isAllowed) return <Navigate replace to={redirectTo}></Navigate>;
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
