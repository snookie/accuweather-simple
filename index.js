const rp = require("request-promise-native");

const getLocationKeyF = config => locationName =>
  rp({
    url: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
    qs: {
      apikey: config.apikey,
      q: locationName,
      language: config.language
    },
    json: true
  }).then(data => data[0].Key);

const getOneDayWeatherF = config => locationKey =>
  rp({
    url: `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`,
    qs: {
      apikey: config.apikey,
      language: config.language,
      metric: config.metric,
      details: config.details
    },
    json: true
  }).then(data => data);

const getWeatherF = config => locationName =>
  getLocationKeyF(config)(locationName).then(locationKey =>
    getOneDayWeatherF(config)(locationKey)
  );

module.exports = userConfig => {
  const config = Object.assign(
    {},
    { language: "en-us", apikey: "", cacheTime: 1000 * 60 * 60 },
    userConfig
  );

  const getLocationKey =
    config.cacheTime === 0
      ? getLocationKeyF(config)
      : require("promise-memoize")(getLocationKeyF(config), {
          maxAge: config.cacheTime
        });

  const getOneDayWeather =
    config.cacheTime === 0
      ? getOneDayWeatherF(config)
      : require("promise-memoize")(getOneDayWeatherF(config), {
          maxAge: config.cacheTime
        });
  const getWeather =
    config.cacheTime === 0
      ? getWeatherF(config)
      : require("promise-memoize")(getWeatherF(config), {
          maxAge: config.cacheTime
        });

  return {
    getLocationKey,
    getOneDayWeather,
    getWeather
  };
};
