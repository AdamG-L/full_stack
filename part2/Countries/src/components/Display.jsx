const Display = ({ display }) => {
    if (display.length === 0) {
        return
    }
    // 0/10+ results
    if (display[0] === 0 || display[0] > 10) {
        return display[1]
    }
    else if (display[0] === 1) {
        //TODO
        const country = display[1]
        console.log(country.flags.png)
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
                        {country}
                    </li>
                )}
            </ul>
        )

    }
}

export default Display