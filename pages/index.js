const key = "";
const weather = {
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
          .then((response) => response.json())
          .then((data) => this.renderWeather(data));
    },

    renderWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
    }

}

weather.fetchWeather("Seattle");