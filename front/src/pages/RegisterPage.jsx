import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
const {
    register,
    handleSubmit, 
    formState:{errors}
}= useForm();
const {signup, isAuthenticated, errors: registerErrors} = useAuth();
const navigate = useNavigate();

const onSubmit = handleSubmit(async (values)=> {
    signup(values);
});
useEffect(()=>{
  if(isAuthenticated)
    navigate('/tasks')
},[isAuthenticated]);

return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {registerErrors.map((error, i) => (
            <p className='bg-red-500 p-2 text-white text-center my-2' 
            key={i}>
                {error}
            </p>
        ))}
        <form onSubmit={onSubmit}>
        <input type="text" {...register("username", {required:true}) }
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="user name"
        />
        {errors.username && (<p className='text-red-500'> Username is required</p>)}
        <input type="email" {...register("email", {required:true} )}  
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="email"
            />
        {errors.email && (<p className='text-red-500'> Email is required</p>)}
        <input type="password" {...register("password", {required:true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="password"
            />
        {errors.password && (<p className='text-red-500'>Password is required</p>)}
        <button type="submit">
            Register
        </button>
        </form>
    </div>
  )
}

export default RegisterPage