const rp = require("request-promise-native");

const getLocationKey = config => locationName =>
  rp({
    url: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
    qs: {
      apikey: config.apikey,
      q: locationName,
      language: config.language
    },
    json: true
  }).then(data => data[0].Key);

const getOneDayWeather = config => locationKey =>
  rp({
    url: `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`,
    qs: {
      apikey: config.apikey,
      language: config.language
    },
    json: true
  }).then(data => data.Headline.Text);

const getWeather = config => locationName =>
  getLocationKey(config)(locationName).then(locationKey =>
    getOneDayWeather(config)(locationKey)
  );

module.exports = userConfig => {
  const config = Object.assign(
    {},
    { language: "en-us", apikey: "" },
    userConfig
  );

  return {
    getOneDayWeather: getOneDayWeather(config),
    getLocationKey: getLocationKey(config),
    getWeather: getWeather(config)
  };
};
