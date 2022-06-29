import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const mintAllowed = process.env.REACT_APP_NFT_ALLOWED

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token == null) {
    return <Navigate to="/" replace />
  }

  const data = jwt_decode(token)
  if (!(data && mintAllowed.includes(data.address))) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute