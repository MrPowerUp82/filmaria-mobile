import axios from 'axios'


const api = axios.create({
    baseURL: 'https://webcoffee.herokuapp.com/api/v1'
})

export default api