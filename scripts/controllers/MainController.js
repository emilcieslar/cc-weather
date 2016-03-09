angular.module('WeatherApp')

.controller('MainController', ['$geolocation', 'WeatherService', 'ecCalloutService', function($geolocation, WeatherService, CalloutService) {

  // ----------------------------------------------------------------------------> DEFINE VARS
  var self = this;

  // Has user allowed geo service?
  self.geoError = false;

  // ----------------------------------------------------------------------------> Try to get user's GEO location
  $geolocation.getCurrentPosition({
    timeout: 60000
  }).then(function(position) {

    // ---------------------------------------> If successful, get weather for that location and display data
    WeatherService.getWeather(position.coords).then(function(response) {

      self.weatherData = response;

    });

  // ---------------------------------------> ERROR
  }, function(error) {
    // If there's an error, log it and display a form to manually enter
    // zip code and country code
    console.error(error);
    // Show form
    self.geoError = true;
    // Display notification
    CalloutService.notify({
      message: 'Location service was not allowed, please provide details to display weather',
    });
  });

  // ----------------------------------------------------------------------------> Get weather manually
  // Helper method to get the weather using zip and country code
  self.getWeatherManually = function() {

    // Get weather for country code and zipcode and display data
    WeatherService.getWeather({

      'zip': self.zipcode,
      'country': self.country

    }).then(function(response) {

      console.log(response);

      // If the country code & zip code combination didn't return any results
      if(response.cod != 200) {

        CalloutService.notify({
          type: 'alert',
          message: 'No weather data for provided location',
          img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg'
        });

      // Otherwise set the data and hide form
      } else {

        // Send a notification about success
        CalloutService.notify({
          type: 'success',
          message: 'Weather data successfully fetched',
          img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg'
        });

        // Set data
        self.weatherData = response;
        // Hide form
        self.geoError = false;

      }

    });

  }

}]);
