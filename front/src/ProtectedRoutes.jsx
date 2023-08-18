import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/authContext";

function ProtectedRoutes() {
    const {loading, user, isAutheticated} = useAuth();
    //si está cargando muestra un mensaje
    if (loading) return <h1>Loading...</h1>
    //si no está cargando y no está autenticado manda a login y no permite volver con replace
    if (!loading && !isAutheticated) return <Navigate to='/login' replace/> 
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes