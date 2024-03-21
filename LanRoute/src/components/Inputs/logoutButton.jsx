import { useLogoutMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";

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

  return <Button variant="contained" color="primary" onClick={handleLogout} startIcon={<LogoutIcon />}>
  Logout
</Button>;
}

export default LogoutButton;
