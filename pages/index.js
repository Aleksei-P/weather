const key = "038e7afc2a1e68b9343e4467ba7853b1";
const button = document.querySelector(".module__search-button");
const inputCity = document.querySelector(".module__search-input");
const weather = {
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`)
      .then((response) => response.json())
      .then((data) => this.renderWeather(data))
      .catch((err) => {
        console.log(err);
      });
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
      document.querySelector("#temp").innerText = Math.round(temp) + " " + " Fº ";
      document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector("#wind").innerText = "Wind speed: " + speed + " miles/hour";
      document.querySelector(".page").style.backgroundImage =
        "url('https://images.unsplash.com/photo-1470290449668-02dd93d9420a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
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