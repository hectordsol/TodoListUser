import { useAuth } from "../context/authContext";
function NavBar() {
    const { isAuthenticated, logout, user } = useAuth();
  return (
    <div>NavBar</div>
  )
}

export default NavBar