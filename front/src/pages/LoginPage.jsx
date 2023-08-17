import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useAuth } from '../context/authContext';
// import { toast } from 'react-toastify';

function LoginPage() {
const {
  register, 
  handleSubmit,
  formState:{errors}
} = useForm();
const {signin, errors: signinErrors}=useAuth();
const onSubmit = handleSubmit ((data)=>{
  console.log(data);
  signin(data);
})
  return (
    <div className='flex h[calc(100vh-100px)] items-center justify-center'>
      <div className='flex-row bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {signinErrors.map((error,i) => 
                (<div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                    {error}
                </div>)
              // {toast(error,{type:'error', autoClose:5000})}
            )
          }
          <h1 className='text-2xl font-bold'>Login</h1>
          
        <form onSubmit={onSubmit}>

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
              Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage