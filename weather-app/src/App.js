import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    country: "",
    countryCode: "",
    temp: "",
    humidity: "",
    weather: "",
    error: "",
  };

  getWeather = async (event) => {
    event.preventDefault();
    const country = event.target.elements.countrySearch.value;
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${country}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await api.json();

    if (country !== "") {
      if (typeof data.name !== "undefined") {
        this.setState({
          country: data.name,
          countryCode: data.sys.country,
          temp: data.main.temp,
          humidity: data.main.humidity,
          weather: data.weather[0].main,
          error: "",
        });
      } else {
        this.setState({
          country: "",
          countryCode: "",
          temp: "",
          humidity: "",
          weather: "",
          error: "Invalid Search",
        });
      }
    } else {
      this.setState({
        country: "",
        countryCode: "",
        temp: "",
        humidity: "",
        weather: "",
        error: "Enter Country Or City Name To Search",
      });
    }
  };

  render() {
    return (
      <div
        className={
          this.state.country
            ? this.state.temp > 77
              ? "App hot"
              : "App cold"
            : "App"
        }
      >
        <form onSubmit={this.getWeather}>
          <input type="text" name="countrySearch" />
          <button type="submit">Search</button>
        </form>
        <div className="Container">
          <div className={this.state.country ? "Temp" : ""}>
            <div>
              {this.state.temp && <span>{Math.round(this.state.temp)}°F,</span>}
              {this.state.weather && <span> {this.state.weather}</span>}
            </div>
            {this.state.humidity && (
              <span>Humidity: {this.state.humidity}%</span>
            )}
          </div>
          <div className={this.state.country ? "Country-Info" : ""}>
            {this.state.country && <span>{this.state.country},</span>}
            {this.state.countryCode && <span> {this.state.countryCode}</span>}
          </div>
          <div className={this.state.error ? "Error" : ""}>
            {this.state.error && <span>{this.state.error}</span>}
          </div>
        </div>
      </div>
    );
  }
}
