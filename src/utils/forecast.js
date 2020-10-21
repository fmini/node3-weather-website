const request = require("postman-request");

const forecast = (latitude, longitude, foreCallback) => {
  const forecastURL =
    "http://api.weatherstack.com/current?access_key=31205d1f455fb9820a9732cdccebdfaf&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=f";
  request({ url: forecastURL, json: true }, (error, { body }) => {
    if (error) {
      foreCallback("Cannot connect to weather service.", undefined);
    } else if (body.error) {
      foreCallback("Unable to find location.", undefined);
    } else {
      foreCallback(
        undefined,
        {
          location: body.location.name,
          desctiption: body.current.weather_descriptions[0],
          temperature: body.current.temperature,
          feelslike: body.current.feelslike,
          forecast: `It is ${body.current.weather_descriptions[0]} in ${body.location.name}, it is ${body.current.temperature} degrees and it feels like ${body.current.feelslike} degrees.`,
        }
        // `It is ${body.current.weather_descriptions[0]} in ${body.location.name}, it is ${body.current.temperature} degrees and it feels like ${body.current.feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
