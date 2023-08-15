import React from 'react';
import { registerRequest } from '../api/auth';
import {useForm} from 'react-hook-form';

function RegisterPage() {
const {register,handleSubmit}= useForm();
const onSubmit = handleSubmit(async (values)=> {
    const response = await registerRequest(values);
    console.log(response);
})
return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <form onSubmit={onSubmit}>
        <input type="text" {...register("username", {required:true}) }
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="user name"
        />
        <input type="email" {...register("email", {required:true} )}  
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="email"
            />
        <input type="password" {...register("password", {required:true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="password"
            />
        <button type="submit">
            Register
        </button>
        </form>
    </div>
  )
}

export default RegisterPage