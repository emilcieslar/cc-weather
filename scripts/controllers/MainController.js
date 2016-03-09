angular.module('WeatherApp')

.controller('MainController', ['$geolocation', 'WeatherService', function($geolocation, WeatherService) {

  var self = this,
      ICON_PREFIX = 'wi-owm-';

  self.icon = '';

  /*$geolocation.getCurrentPosition({
    timeout: 60000
  }).then(function(position) {

    WeatherService.getWeather(position.coords).then(function(response) {

      var weatherList = response.weather;
      for(var i in weatherList) {
        self.icon = ICON_PREFIX + weatherList[i].id;
      }

      console.log(response);

    });

  }, function(error) {
    console.error(error);
  });*/

}]);
