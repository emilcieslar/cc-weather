angular.module('WeatherApp')

.factory('WeatherService', ['$http', '$q', function($http, $q) {

  // -------------------------------------> Define API key
  var APPID = 'a5406db6084c9bf40b2b1196b196e199';

  // -------------------------------------> Return the service
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

        // If the request was successful resolve the response data
        deferred.resolve(response.data);

      // If there was an error during the process, log it
      }, function(error) {
        console.error(error);
      });

      // The promise will be further handled in the controller
      return deferred.promise;

    }

  }

}]);
