import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from '../api/auth';
import Cookie from 'js-cookie';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) throw new Error ('useAuth must be used within an AuthProvider');

    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [errors, setErrors]= useState([]);

    const signup = async (user) =>{
        try{
            const res = await registerRequest(user);
            setUser(res.data);
            setAuthenticated(true);
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
            setAuthenticated(true);
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

    useEffect(() => {
        const cookies = Cookies.get();
        if(cookies.token)
        console.log(token);
    },[errors])

return (
    <AuthContext.Provider value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
        }}> 
        {children}
    </AuthContext.Provider>
    )
}