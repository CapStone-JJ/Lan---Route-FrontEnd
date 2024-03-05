import { useLogoutMutation } from "../../api/auth";

function LogoutButton() {
  const [logout] = useLogoutMutation();


  return <a onClick={logout}>Logout</a>;
}

export default LogoutButton;