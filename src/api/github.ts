import axios from 'axios';
import {GITHUB_URL} from '../data/constant'

const api = axios.create({
    baseURL: GITHUB_URL
})

export default api