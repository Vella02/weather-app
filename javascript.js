async function getWeatherData() {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=1f1c5b1914bd4d49867152530240606&q=paris",
      { mod: "cors" }
    );
    const weather = await response.json();
    console.log(weather.current.condition.text);
  } catch (error) {
    console.log(error);
  }
}
console.log("hi");
getWeatherData();
