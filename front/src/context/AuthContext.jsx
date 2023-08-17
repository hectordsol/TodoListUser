import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from '../api/auth';

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
            console.log(error.response);
            setErrors(error.response.data);
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
            console.log(error.response);
            setErrors(error.response.data);
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