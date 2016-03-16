angular.module('WeatherApp')

.factory('WeatherService', ['$http', '$q', 'ecCalloutService', function($http, $q, CalloutService) {

  // ----------------------------------------------------------------------------> DEFINE VARIABLES
  // -------------------------------------> Define API key
  var APPID = 'a5406db6084c9bf40b2b1196b196e199';

  // ----------------------------------------------------------------------------> RETURN THE SERVICE
  return {

    // -------------------------------------> A method to return weather data
    // Params can contain lat, lon, zip and country, the method will
    // recognize which request should be send depending on specified params
    getWeather: function(params) {

      var deferred = $q.defer();

      // Try to get the weather with specified parameters
      $http.get('//api.openweathermap.org/data/2.5/weather', {

        params: {
          lat: params.latitude,
          lon: params.longitude,
          // zip must be in format: zip,countryCode
          zip: params.zip && params.country ? params.zip.toLowerCase().replace(/\s/g, "") + ',' + params.country.toLowerCase().replace(/\s/g, "")  : '',
          units: 'metric',
          APPID: APPID
        }

      }).then(function(response) {

        console.log(response);

        // Check for response.data.cod property
        // If it's not 200, the response is not successful
        // This happens when API's response status is 200 (which is basically
        // success and therefore handled here), yet the API responded
        // with data containing cod: "404", which is an error
        if(response.data.cod != 200) {

          CalloutService.notify({
            type: 'alert',
            message: response.data.message,
            img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg'
          });

        // Otherwise, if it's cod: "200", we have successful response and can handle the data
        } else {

          // Send a notification about success
          CalloutService.notify({
            type: 'success',
            message: 'Weather data successfully fetched',
            img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg',
            timeout: 2000
          });

          // Resolve the response data
          deferred.resolve(response.data);

        }

      // If there was an error during the process, log it
      }, function(error) {
        console.error(error);
      });

      // The promise will be further handled in the controller
      return deferred.promise;

    }

  }

}]);
