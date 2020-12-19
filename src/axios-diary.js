import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://diary-a95bf.firebaseio.com/sd'
});

export default instance;