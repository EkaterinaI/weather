import React from "react";

const Weather = props => (
	<div>
		{ props.city&& <button onClick={props.addFav} className="favButton">Add to fav</button>}
	
		<div className="weather__info">
	 {	
	 	props.city&& <p className="weather__key"> Location: 
	 		<span className="weather__value"> { props.city }, { props.country }</span>
	 	</p> 
	 }
	 { 	
	 	props.temperature && <p className="weather__key"> Temperature: 
	 		<span className="weather__value"> { props.temperature }<button onClick={props.changeUnit}>&deg;{ props.textvalue }</button> </span>
	 	</p> 
	 }
	 { 	
	 	props.humidity && <p className="weather__key"> Humidity: 
	 		<span className="weather__value"> { props.humidity } </span>
	 	</p> 
	 }
	 { 	
	 	props.description && <p className="weather__key"> Conditions: 
	 		<span className="weather__value"> { props.description } </span>
	 </p> 
	 }
	 { 
	 	props.error && <p className="weather__error">{ props.error }</p>  
	 }

	</div>
	</div>
	
);

export default Weather;