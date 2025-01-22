import Services from '../services/Services'
import { useState, useEffect } from 'react'

const Display = ({ display, setSearch }) => {
    const [weather, setWeather] = useState(null)
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (country === null) { return }
        else {
            Services.getWeather(country.name.common)
                .then(res => setWeather(res))
        }
    }, [country])

    if (display.length === 0) {
        return
    }
    // 0/10+ results
    if (display[0] === 0 || display[0] > 10) {
        return display[1]
    }
    else if (display[0] === 1) {
        const currentCountry = display[1]
        // Don't display until country has a valid state
        if (currentCountry !== country) {
            setCountry(currentCountry)
            return
        }
        if (weather === null) { return }

        return (
            <>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h2>Spoken Languages</h2>
                <ul>
                    {Object.values(country.languages).map(value =>
                        <li key={value}>{value}</li>
                    )}
                </ul>
                <img src={country.flags.png}></img>
                <h2>Weather</h2>
                <p>Temperature: {weather.main.temp}°F</p>
                <p>{weather.weather[0].main}</p>
                <img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@4x.png'}></img>
            </>
        )
    }
    // <10 results
    // Note: uses implicit return for each <li>
    else {
        const countries = display[1]
        return (
            <ul>
                {countries.map(country =>
                    <li key={country}>
                        {country} <button onClick={() => setSearch(country)}>Show</button>
                    </li>
                )}
            </ul>
        )

    }
}

export default Display