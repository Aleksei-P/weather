const key = "038e7afc2a1e68b9343e4467ba7853b1";
const button = document.querySelector(".module__search-button");
const inputCity = document.querySelector(".module__search-input");
const weather = {
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`)
      .then((response) => response.json())
      .then((data) => this.renderWeather(data))
  },

  renderWeather: function (data) {
    if (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name, icon, description, temp, humidity, speed);
      document.querySelector(".info__city").innerText = "Weather in " + name;
      document.querySelector("#description").innerText = description.charAt(0).toUpperCase() + description.slice(1);
      document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector("#temp").innerText = temp + " " + " Fº ";
      document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector("#wind").innerText = "Wind speed: " + speed  + " miles/hour";
    }
  },
  search: function() {
    this.fetchWeather(inputCity.value);
    console.log(inputCity.value);
  },
};
  weather.fetchWeather("New York")

  button.addEventListener("click", function(){
    weather.search();
    inputCity.value="";
  })
 inputCity.addEventListener("keyup", function (evt) {
    if (evt.key == "Enter") {
      weather.search();
      inputCity.value = "";
    }
  });


