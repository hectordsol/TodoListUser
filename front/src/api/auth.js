import axios from './axios.js';

const API = "http://localhost:4001";

export const registerRequest = (user) => axios.post(`${API}/register`,user);

export const loginRequest = (user) => axios.post(`${API}/login`,user);