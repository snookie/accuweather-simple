Accuweather simple
=========

AccuWeather API simple wrapper

## Installation

  `npm install accuweather-simple`

## Usage

    const config = {
      apikey: "XXXXXXXX", // Your API Key
      language: "en-us", // Your Language Code
      metric: true, // Returnvalues in Metric
      details: true // More Details
    };

    const accuweatherSimple = require('accuweather-simple')(config);

    accuweatherSimple.getWeather("santiago").then(result => console.log(result));
  
  
  Output should be something like `Expect showery weather tomorrow afternoon through tomorrow evening`


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.