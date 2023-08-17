import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/authContext";

function ProtectedRoutes() {
    const {user, isAutheticated} = useAuth();
    //si no está autenticado manda a login y no permite volver con replace
    if (!isAutheticated) return <Navigate to='/login' replace/> 
    
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes