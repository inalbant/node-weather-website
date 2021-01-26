const weatherFormEl = document.querySelector("form");
const searchEl = document.querySelector("input");
const mesg1 = document.querySelector("#message-1");
const mesg2 = document.querySelector("#message-2");

weatherFormEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  mesg1.textContent = "";
  mesg2.textContent = "Loading...";

  const searchQuery = searchEl.value;

  fetch(
    `http://api.weatherstack.com/current?access_key=2b8c098b40fb7fd15e28a570cd2af3dd&query=${searchQuery}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        mesg2.textContent = "Error";
      } else {
        mesg1.textContent = `Here is the weather data for ${data.location.name}, ${data.location.country}:`;
        mesg2.textContent = `It is currently ${data.current.weather_descriptions[0]}, with temperatures of ${data.current.temperature} degrees C.`;

        console.log(data);
      }
    });
  });
});
