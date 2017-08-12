const config = {
  apikey: "XXXXXXXX",
  language: "es-cl"
};
const accuweatherSimple = require("./index")(config);

accuweatherSimple.getWeather("santiago").then(result => console.log(result));
