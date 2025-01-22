import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_SOME_KEY


const getAll = () => {
    return axios
    .get(baseUrl + "all")
    .then(response => response.data)
}

const getWeather = (city) => {
    const url = weatherUrl + 'q=' + city + "&appid=" + api_key + '&units=imperial'
    return axios
    .get(url)
    .then(response => response.data)
}

export default {getAll, getWeather}