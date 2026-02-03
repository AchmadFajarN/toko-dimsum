import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const ProtectedNonAdmin = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.role !== 'admin') {
    navigate('/')
  }

  return children;
};

export default ProtectedNonAdmin;
