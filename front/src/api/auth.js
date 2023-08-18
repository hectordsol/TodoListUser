import axios from './axios.js';

// const API = "http://localhost:4001";

export const registerRequest = (user) => axios.post(`/register`,user);

export const loginRequest = (user) => axios.post(`/login`,user);

export const verifyTokenRequest = (user) => axios.get(`/verify`);