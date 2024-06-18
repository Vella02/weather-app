const searchBTN = document.getElementById("search");
const userArea = "steubenville";
searchBTN.addEventListener("click", async function () {
  try {
    const currentWeather = await getCurrentWeatherData(userArea);
    currentCondition.textContent = currentWeather.condition;
    currentTemp.textContent = currentWeather.temp;
    feelsTemp.textContent = currentWeather.feelsLikeTemp;

    const tomorrow = await getFutureWeatherData(userArea, 1);
    tomorrowsCondition.textContent = tomorrow.condition;
    tomorrowsHigh.textContent = tomorrow.high;
    tomorrowsLow.textContent = tomorrow.low;

    const future = await getFutureWeatherData(userArea, 2);
    futureCondition.textContent = future.condition;
    futureHigh.textContent = future.high;
    futureLow.textContent = future.low;
  } catch (error) {
    console.log(error);
  }
});

const currentCondition = document.getElementById("current-condition");
const currentTemp = document.getElementById("current-temp");
const feelsTemp = document.getElementById("feels-temp");

const tomorrowsCondition = document.getElementById("tomorrows-condition");
const tomorrowsHigh = document.getElementById("tomorrow-high");
const tomorrowsLow = document.getElementById("tomorrow-low");

const futureCondition = document.getElementById("future-condition");
const futureHigh = document.getElementById("future-high");
const futureLow = document.getElementById("future-low");

//getCurrentWeatherData(userArea);
getFutureWeatherData(userArea, 2);

async function getCurrentWeatherData(location) {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=1f1c5b1914bd4d49867152530240606&q=" +
        location,
      { mod: "cors" }
    );
    const weather = await response.json();
    const condition = weather.current.condition.text;
    const temp = weather.current.temp_f;
    const feelsLikeTemp = weather.current.feelslike_f;
    return { condition, temp, feelsLikeTemp };
  } catch (error) {
    console.log(error);
  }
}

async function getFutureWeatherData(location, days) {
  try {
    const futureWeatherDate = getFutureDate(days);
    const futureWeather = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=1f1c5b1914bd4d49867152530240606&q=" +
        location +
        "&dt=" +
        futureWeatherDate,
      { mod: "no-cors" }
    );
    const futureWeatherForecast = await futureWeather.json();
    const condition =
      futureWeatherForecast.forecast.forecastday[0].day.condition.text;
    const high = futureWeatherForecast.forecast.forecastday[0].day.maxtemp_f;
    const low = futureWeatherForecast.forecast.forecastday[0].day.mintemp_f;
    // console.log(
    //   futureWeatherForecast.forecast //.forecastday[0].day.condition.text
    // );
    return { condition, high, low };
  } catch (error) {
    console.log(error);
  }
}

function getFutureDate(days) {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate() + days;

  return `${year}-${month}-${day}`;
  //console.log(`${year}-${month}-${day}`);
}
