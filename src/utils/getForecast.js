import request from "postman-request";

export const getForecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2b8c098b40fb7fd15e28a570cd2af3dd&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees C, but feels like ${body.current.feelslike} degrees.`
      );
    }
  });
};
