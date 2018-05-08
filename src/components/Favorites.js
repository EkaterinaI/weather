import React,{Component} from 'react';
import FavorCity from "./FavorCity";

var citiesMap = {
    'london': 'london',
    'kiev': 'kiev',
    'manchester': 'manchester',
    'odessa': 'odessa',
    'moscow': 'moscow'
  }
  const API_KEY = "502f4bef0c6a6c724bc1612c6cfe292e";

class Favorites extends Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,
        cityName: ''
    }
   
      onCityClick = async (e) => {
        const cityName = e;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        
          this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
          });
        
      }
    render() {
        return(
            <div className="favorites">
                    <h3>Favorites</h3>
                    {
                      Object.keys(citiesMap).map(function(cityName, index) {
                        var classSelection = '';
                        if(cityName.toLowerCase() === this.state.cityName.toLowerCase()) {
                          classSelection = ' selected';
                        }
                      
                          return(
                            <div className={"city-box" + classSelection} onClick={this.onCityClick.bind(this, cityName)}>{cityName.toUpperCase()}</div>
                          )
                      }, this)
                    }
                    <FavorCity temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}/>
                  </div>
        )
    }
}
export default Favorites;