const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading Content";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location + "&units=f").then(
    response => {
      response.json().then(body => {
        if (body.error) {
          return (messageOne.textContent = body.error);
        }
        messageOne.textContent = location;
        messageTwo.textContent = body.forecast;
      });
    }
  );
});
