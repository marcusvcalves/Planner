import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://129.148.61.243:8000',
});

export default instance;
