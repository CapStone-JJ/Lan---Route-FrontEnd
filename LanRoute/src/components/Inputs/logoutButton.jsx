import { useLogoutMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Replace '/login' with the actual path to your login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return <a onClick={handleLogout}>Logout</a>;
}

export default LogoutButton;
