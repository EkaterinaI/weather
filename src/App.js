import React from "react";

import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "502f4bef0c6a6c724bc1612c6cfe292e";

var citiesMap = [
  'London',
  'Kiev',
  'Manchester',
  'Odessa',
  'Moscow'

]
if(localStorage.length) {

} else {
  localStorage.setItem('citiesMap', JSON.stringify(citiesMap));
}
console.log(citiesMap)

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
    city.toLowerCase();
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    try {
      const data = await api_call.json();
      if (city) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: "",
          textvalue: 'C' 
  
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
    catch(error) {
      console.log(error);
      alert("vvedite city pravilna")
    }
    
  }
 
  // addFav = (city) => {
  //   citiesMap.push(this.state.city);
  //   localStorage.setItem('citiesMap', JSON.stringify(citiesMap));
  //   this.setState({citiesMap: this.state.citiesMap});
  // }
  addFav = (city) => {
 
      let cityName = this.state.city;
      console.log(cityName)
      if(citiesMap.indexOf(cityName) === -1) {
        citiesMap.push(this.state.city);
        localStorage.setItem('citiesMap', JSON.stringify(citiesMap));
        citiesMap = JSON.parse(localStorage.getItem('citiesMap')) || [];
        this.setState({citiesMap: citiesMap});
      } else {
        return
      }
    
  }
  changeUnit = async (textvalue) => {
    const cityN = this.state.city;

    if(this.state.textvalue === 'F') {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityN}&appid=${API_KEY}&units=metric`);
      const data = await api_call.json();
      this.setState({
        temperature: data.main.temp,
        error: "",
        textvalue: 'C'
      });
      
    } else {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityN}&appid=${API_KEY}&units=imperial`);
      const data = await api_call.json();
      this.setState({
        temperature: data.main.temp,
        error: "",
        textvalue: 'F'
      });
    }
  }
onCityClick = async (e) => {
        const cityName = e;
        cityName.toLowerCase();
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        
          this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: "",
            textvalue: 'C' 
          });
        
      }
  render() {
    return (
      <div>
        <div className="wrapper">
          
            <div className="container">
              <div className="row main">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 title-container">
                  <div className="favorites">
                    <h3>Favorites</h3> 
                    {
                      citiesMap.map(function(cityName, index) {
                        
                        var classSelection = '';
                        // if(cityName.toLowerCase() === this.state.cityName.toLowerCase()) {
                        //   classSelection = ' selected';
                        // }
                        
                          return(
                           
                            <div className={"city-box" + classSelection} onClick={this.onCityClick.bind(this, cityName)}>
                            {cityName.toUpperCase()}
                            </div>
                             
                           
                          )
                      }, this)
                    } 
                  
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 form-container">
                  <Form getWeather={this.getWeather.bind(this)}/>
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    addFav={this.addFav}
                    changeUnit={this.changeUnit}
                    textvalue={this.state.textvalue}
                  />
            
                  
                </div>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
};
console.log(localStorage)
console.log(citiesMap)
citiesMap = JSON.parse(localStorage.getItem('citiesMap')) || [];
// localStorage.clear();  
export default App;