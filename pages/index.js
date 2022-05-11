const key = "038e7afc2a1e68b9343e4467ba7853b1";
const weather = {
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`)
      .then((response) => response.json())
      .then((data) => (this.renderWeather(data), console.log(data)))
  },

  renderWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".info__city").innerText = "Weather in " + name;
    document.querySelector("#description").innerText = description.charAt(0).toUpperCase() + description.slice(1);
    document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#temp").innerText = temp + " " + " Fº";
    document.querySelector("#humidity").innerText = "Humidity : " + humidity + "%";
    document.querySelector("#wind").innerText = "Wind speed : " + speed  + " miles/hour";
  },
};

weather.fetchWeather("Dallas");
