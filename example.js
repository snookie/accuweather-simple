const config = {
  apikey: "XXXXXXXX",
  language: "es-cl",
  metric: "true",
  details: "true"
};
const accuweatherSimple = require("./index")(config);

accuweatherSimple.getWeather("santiago").then(result => console.log(result));
