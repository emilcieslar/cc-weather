angular.module('WeatherApp')

.directive('weatherWidget', [function() {

  return {
    restrict: 'AE',
    scope: {
      weatherData: '='
    },
    templateUrl: './templates/weather.html'
  }

}]);
