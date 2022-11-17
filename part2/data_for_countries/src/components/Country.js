const Country = ({country, weather}) => {
    console.log(weather);

    return (
      <div>
        <h1>{country.name.common}</h1>
        
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <h3>languages</h3>

        <ul>
            {Object.values(country.languages).map(language => 
                <li key={language}>{language}</li>
            )}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag` } />

        <h3>Weather in {country.name.common}</h3>
        
        <div>temperature {weather.main.temp} celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
}

export default Country