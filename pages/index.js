const key = "038e7afc2a1e68b9343e4467ba7853b1";
const button = document.querySelector(".module__search-button");
const inputCity = document.querySelector(".module__search-input");
const weather = {
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
      .then((response) => response.json())
      .then((data) => this.renderWeather(data))
      .catch((err) => {console.log(err)})
    },

  renderWeather: function (data) {
    if (data.cod == 200) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".info__city").innerText = "Weather in " + name;
      document.querySelector("#description").innerText = description.charAt(0).toUpperCase() + description.slice(1);
      document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector("#temp").innerText = Math.round(temp) + " " + " Cº ";
      document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector("#wind").innerText = "Wind speed: " + speed + " m/s";
      document.querySelector(".page").style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    }

    else {
      document.querySelector(".info__city").innerText = "Check the city name" ;
      document.querySelector("#description").innerText = "City";
      document.querySelector("#icon").src = "";
      document.querySelector("#temp").innerText = "";
      document.querySelector("#humidity").innerText = "Doesn't";
      document.querySelector("#wind").innerText = "Exist";
    }
  },

  display: function() {
      document.querySelector(".info").classList.remove("info_loading");
      document.querySelector("#page").classList.remove("page_loading");
  },

  hide: function(){
    document.querySelector(".info").classList.add("info_loading");
    document.querySelector("#page").classList.add("page_loading");

  },

  search: function() {
    this.fetchWeather(inputCity.value);
    this.hide();
    setTimeout(this.display, 1600);
  },
};

//start app
  weather.fetchWeather("New York")
  setTimeout(weather.display, 1600);

  button.addEventListener("click", function(){
    if(inputCity.value !== "")
    weather.search();
    inputCity.value="";
  })
 inputCity.addEventListener("keyup", function (evt) {
    if (evt.key == "Enter" && inputCity.value !== "") {
      weather.search();
      inputCity.value = "";
    }
  });

  // "url('https://source.unsplash.com/1600x900/?" + name + "')";