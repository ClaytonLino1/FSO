import Country from "./Country"
import { useEffect } from "react"


const Countries = ({data, search, showCountry, country, getLatLang, weather})  => {

  const filteredCountries = data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
      if (filteredCountries.length === 1) {
        getLatLang(filteredCountries[0])
      }
      else if(Object.hasOwn(country, "name")) {
        getLatLang(country)
      }
    })
  

    if (Object.hasOwn(country, "name")) {
        return (<Country country={country} weather={weather}/>)
    }

    

    if (filteredCountries.length === 1) {
      return (<Country country={filteredCountries[0]} weather={weather}/>)
    }
  
    else if (filteredCountries.length > 10) {
      return (
        <div>
          Too many matches, type more.
        </div>
      )
    }
  
    else if (filteredCountries.length <= 10) {
      return (
          filteredCountries.map(country => 
            <div key={country.name.common}>
              {country.name.common} 
              <button onClick={() => showCountry(country)}>
                show
              </button>
            </div>)
      )
    }
  
  }


export default Countries