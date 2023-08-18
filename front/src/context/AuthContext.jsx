import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';

import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) throw new Error ('useAuth must be used within an AuthProvider');

    return context;
}

export const AuthProvider = ({children}) => {
    const [loading, setLoading]=useState(true);
    const [user, setUser]=useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors]= useState([]);

    const signup = async (user) =>{
        try{
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        }
        catch(error){
            // console.log("signout",error.response.data[0]);
            setErrors(error.response.data[0]);
        }
    }
    const signin = async (user) =>{
        try{
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        }
        catch(error){
            // console.log("signin",error.response.data[0]);
            setErrors(error.response.data[0]);
        }
    }
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(()=> {
                setErrors([])
            },5000)
        return ()=>{ clearTimeout(timer)}
        }
    },[errors])

useEffect(() => {//cuando cargo la página
    async function checkLogin() {
        const cookies = Cookies.get();
        if(!cookies.token){//si no hay token válido
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
        }
        try {//si hay token.. pedir al back y verificar
            const res = await verifyTokenRequest(token);
            if(!res.data) {// si no es válido
                setIsAuthenticated(false);
                setLoading(false);
            return;
            }
            //si es válido
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    } 
    checkLogin();
    },[errors])

return (
    <AuthContext.Provider value={{
        signup,
        signin,
        user,
        loading,
        isAuthenticated,
        errors,
        }}> 
        {children}
    </AuthContext.Provider>
    )
}