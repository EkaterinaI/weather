import React from "react";

import Form from "./components/Form";
import Weather from "./components/Weather";
// import Favorites from "./components/Favorites";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const API_KEY = "502f4bef0c6a6c724bc1612c6cfe292e";

var citiesMap = [
   'london',
  'kiev',
  'manchester',
  'odessa',
  'moscow'
]

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    cityName: '',
    citiesMap: []
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values.",
        cityName: ''
      });
    }
  }
 
  addFav = (city) => {
    citiesMap.push(this.state.city);
    localStorage.setItem('citiesMap', JSON.stringify(citiesMap));
    this.setState({citiesMap: this.state.citiesMap});
    console.log(citiesMap)
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
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-4 title-container">
                  <div className="favorites">
                    <h3>Favorites</h3> 
                    {
                      citiesMap.map(function(cityName, index) {
                        var classSelection = '';
                        if(cityName.toLowerCase() === this.state.cityName.toLowerCase()) {
                          classSelection = ' selected';
                        }
                      
                          return(
                           
                            <div className={"city-box" + classSelection} onClick={this.onCityClick.bind(this, cityName)}>
                            {cityName.toUpperCase()}
                            </div>
                             
                           
                          )
                      }, this)
                    } 
                  
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8 form-container">
                  <Form getWeather={this.getWeather.bind(this)}/>
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    addFav={this.addFav}
                  />
            
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
citiesMap = JSON.parse(localStorage.getItem('citiesMap')) || [];
export default App;