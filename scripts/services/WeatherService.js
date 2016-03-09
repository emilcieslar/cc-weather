angular.module('WeatherApp')

.factory('WeatherService', ['$http', '$q', function($http, $q) {

  // -------------------------------------> Define private variables and constants
  var weather,
      APPID = 'a5406db6084c9bf40b2b1196b196e199';

  // -------------------------------------> Return the service
  return {

    getWeather: function(params) {

      var deferred = $q.defer();

      $http.get('//api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: params.latitude,
          lon: params.longitude,
          zip: params.zip && params.country ? params.zip.toLowerCase() + ',' + params.country.toLowerCase()  : '',
          units: 'metric',
          APPID: APPID
        }
      }).then(function(response) {

        deferred.resolve(response.data);

      }, function(error) {
        console.error(error);
      });

      return deferred.promise;

    }

  }

}]);
