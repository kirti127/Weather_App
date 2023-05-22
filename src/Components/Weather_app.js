import React from "react";
import Weather_app_style from "./Weather_app_style.css";

class Weather_app extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isSearched: false,
      cityName: null,
      cityTemp: null,
      iconURL: null,
      apiKey: "051c98937c7bf60743dde71df667d592",
      
    };
    
  }

  getData = () => {
    var CityName = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${this.state.apiKey}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.cod !== 200){
        alert("Please enter correct city name")
      }
      else{
        var currentTemp = Math.floor(res.main.temp-273.15)
        var IconNum = res.weather[0].icon;
        var IconUrl = `http://openweathermap.org/img/wn/${IconNum}@2x.png`
        this.setState(
         {
           isSearched: true,
           cityTemp: currentTemp,
           cityName: CityName,
           iconURL: IconUrl
          }
        )
        document.getElementById('city').value=""; 
      }
    });
  }
  render(){
    return (
      <div className="card" >
        <p className="title">
          WEATHER APP
        </p>
        <label>Enter City Name</label><br/>
        <input className="city_input" id="city" autoFocus={true} type="text" placeholder="What's your city name?"/><br/>
        <button onClick={this.getData} className="getBtn">Get Details</button>

       
       {/* <p className="city_name">City: Bhopal</p>
        <p className="Temp">
          Temp: 23 *C
        </p>*/}
        
        {
           this.state.isSearched?
           <div>
              <p className="city_name">City: {this.state.cityName}</p>
              <p className="Temp"> Temp: {this.state.cityTemp} *C </p>
              <img className="Tempicon" src={this.state.iconURL}/>
           </div>
           :<></>
        }
      </div>
    );
  }
};

export default Weather_app;