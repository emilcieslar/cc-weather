angular.module('WeatherApp', ['ngGeolocation', 'iso-3166-country-codes']);

angular.module('WeatherApp')

.factory('WeatherService', ['$http', '$q', function($http, $q) {

  // -------------------------------------> Define private variables and constants
  var weather,
      APPID = 'a5406db6084c9bf40b2b1196b196e199';

  // -------------------------------------> Return the service
  return {

    getWeather: function(coords) {

      var deferred = $q.defer();

      $http.get('//api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIldlYXRoZXJTZXJ2aWNlLmpzIiwiTWFpbkNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJXZWF0aGVyQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ1dlYXRoZXJBcHAnLCBbJ25nR2VvbG9jYXRpb24nLCAnaXNvLTMxNjYtY291bnRyeS1jb2RlcyddKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdXZWF0aGVyQXBwJylcblxuLmZhY3RvcnkoJ1dlYXRoZXJTZXJ2aWNlJywgWyckaHR0cCcsICckcScsIGZ1bmN0aW9uKCRodHRwLCAkcSkge1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IERlZmluZSBwcml2YXRlIHZhcmlhYmxlcyBhbmQgY29uc3RhbnRzXG4gIHZhciB3ZWF0aGVyLFxuICAgICAgQVBQSUQgPSAnYTU0MDZkYjYwODRjOWJmNDBiMmIxMTk2YjE5NmUxOTknO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IFJldHVybiB0aGUgc2VydmljZVxuICByZXR1cm4ge1xuXG4gICAgZ2V0V2VhdGhlcjogZnVuY3Rpb24oY29vcmRzKSB7XG5cbiAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICRodHRwLmdldCgnLy9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXInLCB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGxhdDogY29vcmRzLmxhdGl0dWRlLFxuICAgICAgICAgIGxvbjogY29vcmRzLmxvbmdpdHVkZSxcbiAgICAgICAgICBBUFBJRDogQVBQSURcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgfVxuXG4gIH1cblxufV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ1dlYXRoZXJBcHAnKVxuXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBbJyRnZW9sb2NhdGlvbicsICdXZWF0aGVyU2VydmljZScsIGZ1bmN0aW9uKCRnZW9sb2NhdGlvbiwgV2VhdGhlclNlcnZpY2UpIHtcblxuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBJQ09OX1BSRUZJWCA9ICd3aS1vd20tJztcblxuICBzZWxmLmljb24gPSAnJztcblxuICAvKiRnZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oe1xuICAgIHRpbWVvdXQ6IDYwMDAwXG4gIH0pLnRoZW4oZnVuY3Rpb24ocG9zaXRpb24pIHtcblxuICAgIFdlYXRoZXJTZXJ2aWNlLmdldFdlYXRoZXIocG9zaXRpb24uY29vcmRzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICAgIHZhciB3ZWF0aGVyTGlzdCA9IHJlc3BvbnNlLndlYXRoZXI7XG4gICAgICBmb3IodmFyIGkgaW4gd2VhdGhlckxpc3QpIHtcbiAgICAgICAgc2VsZi5pY29uID0gSUNPTl9QUkVGSVggKyB3ZWF0aGVyTGlzdFtpXS5pZDtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgfSk7XG5cbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfSk7Ki9cblxufV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
