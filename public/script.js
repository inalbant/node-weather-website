const weatherFormEl = document.querySelector("form");
const searchEl = document.querySelector("input");
const mesg1 = document.querySelector("#message-1");
const mesg2 = document.querySelector("#message-2");

weatherFormEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  mesg1.textContent = "";
  mesg2.textContent = "Loading...";

  const searchQuery = searchEl.value;

  fetch("/weather?address=" + searchQuery).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        mesg2.textContent = "Error";
      } else {
        console.log(data);
        mesg1.textContent = `Here is the weather data for ${data.location}:`;
        mesg2.textContent = data.forecast;
      }
    });
  });
});
