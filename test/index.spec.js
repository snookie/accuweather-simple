const config = {
  apikey: "XXXXXXXX",
  language: "es-cl"
};
let accuweatherSimple;
const mockLocationKey = [{ Key: "something" }];
const mockWeatherText = { Headline: { Text: "my weather" } };

describe("accuweatherSimple", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.unmock("request-promise-native");
  });

  it("should call getLocationKey and return a key", () => {
    jest.mock("request-promise-native", () => () =>
      Promise.resolve(mockLocationKey)
    );
    accuweatherSimple = require("../index")(config);

    return accuweatherSimple.getLocationKey("city").then(result => {
      expect(result).toBe(mockLocationKey[0].Key);
    });
  });

  it("should call getOneDayWeather and return weather text", () => {
    jest.mock("request-promise-native", () => () =>
      Promise.resolve(mockWeatherText)
    );
    accuweatherSimple = require("../index")(config);

    return accuweatherSimple.getOneDayWeather("1234").then(result => {
      expect(result).toBe(mockWeatherText.Headline.Text);
    });
  });
});
