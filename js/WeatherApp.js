angular.module('WeatherApp', ['ngGeolocation', 'angular-ec-callout']);

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

      // Send a notification about success
      CalloutService.notify({
        type: 'success',
        message: 'Weather data successfully fetched',
        img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg',
        timeout: 2000
      });

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
          img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg',
          timeout: 2000
        });

        // Set data
        self.weatherData = response;
        // Hide form
        self.geoError = false;

      }

    });

  }

}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIldlYXRoZXJTZXJ2aWNlLmpzIiwiV2VhdGhlckRpcmVjdGl2ZS5qcyIsIk1haW5Db250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJXZWF0aGVyQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ1dlYXRoZXJBcHAnLCBbJ25nR2VvbG9jYXRpb24nLCAnYW5ndWxhci1lYy1jYWxsb3V0J10pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ1dlYXRoZXJBcHAnKVxuXG4uZmFjdG9yeSgnV2VhdGhlclNlcnZpY2UnLCBbJyRodHRwJywgJyRxJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT4gRGVmaW5lIEFQSSBrZXlcbiAgdmFyIEFQUElEID0gJ2E1NDA2ZGI2MDg0YzliZjQwYjJiMTE5NmIxOTZlMTk5JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPiBSZXR1cm4gdGhlIHNlcnZpY2VcbiAgcmV0dXJuIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IEEgbWV0aG9kIHRvIHJldHVybiB3ZWF0aGVyIGRhdGFcbiAgICAvLyBQYXJhbXMgY2FuIGNvbnRhaW4gbGF0LCBsb24sIHppcCBhbmQgY291bnRyeSwgdGhlIG1ldGhvZCB3aWxsXG4gICAgLy8gcmVjb2duaXplIHdoaWNoIHJlcXVlc3Qgc2hvdWxkIGJlIHNlbmQgZGVwZW5kaW5nIG9uIHNwZWNpZmllZCBwYXJhbXNcbiAgICBnZXRXZWF0aGVyOiBmdW5jdGlvbihwYXJhbXMpIHtcblxuICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgLy8gVHJ5IHRvIGdldCB0aGUgd2VhdGhlciB3aXRoIHNwZWNpZmllZCBwYXJhbWV0ZXJzXG4gICAgICAkaHR0cC5nZXQoJy8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyJywge1xuXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGxhdDogcGFyYW1zLmxhdGl0dWRlLFxuICAgICAgICAgIGxvbjogcGFyYW1zLmxvbmdpdHVkZSxcbiAgICAgICAgICAvLyB6aXAgbXVzdCBiZSBpbiBmb3JtYXQ6IHppcCxjb3VudHJ5Q29kZVxuICAgICAgICAgIHppcDogcGFyYW1zLnppcCAmJiBwYXJhbXMuY291bnRyeSA/IHBhcmFtcy56aXAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgXCJcIikgKyAnLCcgKyBwYXJhbXMuY291bnRyeS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCBcIlwiKSAgOiAnJyxcbiAgICAgICAgICB1bml0czogJ21ldHJpYycsXG4gICAgICAgICAgQVBQSUQ6IEFQUElEXG4gICAgICAgIH1cblxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsIHJlc29sdmUgdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcblxuICAgICAgLy8gSWYgdGhlcmUgd2FzIGFuIGVycm9yIGR1cmluZyB0aGUgcHJvY2VzcywgbG9nIGl0XG4gICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUaGUgcHJvbWlzZSB3aWxsIGJlIGZ1cnRoZXIgaGFuZGxlZCBpbiB0aGUgY29udHJvbGxlclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICB9XG5cbiAgfVxuXG59XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnV2VhdGhlckFwcCcpXG5cbi5kaXJlY3RpdmUoJ3dlYXRoZXJXaWRnZXQnLCBbZnVuY3Rpb24oKSB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICBzY29wZToge1xuICAgICAgd2VhdGhlckRhdGE6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RlbXBsYXRlcy93ZWF0aGVyLmh0bWwnXG4gIH1cblxufV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ1dlYXRoZXJBcHAnKVxuXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBbJyRnZW9sb2NhdGlvbicsICdXZWF0aGVyU2VydmljZScsICdlY0NhbGxvdXRTZXJ2aWNlJywgZnVuY3Rpb24oJGdlb2xvY2F0aW9uLCBXZWF0aGVyU2VydmljZSwgQ2FsbG91dFNlcnZpY2UpIHtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPiBERUZJTkUgVkFSU1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gSGFzIHVzZXIgYWxsb3dlZCBnZW8gc2VydmljZT9cbiAgc2VsZi5nZW9FcnJvciA9IGZhbHNlO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IFRyeSB0byBnZXQgdXNlcidzIEdFTyBsb2NhdGlvblxuICAkZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHtcbiAgICB0aW1lb3V0OiA2MDAwMFxuICB9KS50aGVuKGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IElmIHN1Y2Nlc3NmdWwsIGdldCB3ZWF0aGVyIGZvciB0aGF0IGxvY2F0aW9uIGFuZCBkaXNwbGF5IGRhdGFcbiAgICBXZWF0aGVyU2VydmljZS5nZXRXZWF0aGVyKHBvc2l0aW9uLmNvb3JkcykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICBzZWxmLndlYXRoZXJEYXRhID0gcmVzcG9uc2U7XG5cbiAgICAgIC8vIFNlbmQgYSBub3RpZmljYXRpb24gYWJvdXQgc3VjY2Vzc1xuICAgICAgQ2FsbG91dFNlcnZpY2Uubm90aWZ5KHtcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICBtZXNzYWdlOiAnV2VhdGhlciBkYXRhIHN1Y2Nlc3NmdWxseSBmZXRjaGVkJyxcbiAgICAgICAgaW1nOiAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm91bmRpY29ucy8zLjAuMC9zdmdzL2ZpLWNoZWNrLnN2ZycsXG4gICAgICAgIHRpbWVvdXQ6IDIwMDBcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPiBFUlJPUlxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIElmIHRoZXJlJ3MgYW4gZXJyb3IsIGxvZyBpdCBhbmQgZGlzcGxheSBhIGZvcm0gdG8gbWFudWFsbHkgZW50ZXJcbiAgICAvLyB6aXAgY29kZSBhbmQgY291bnRyeSBjb2RlXG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgLy8gU2hvdyBmb3JtXG4gICAgc2VsZi5nZW9FcnJvciA9IHRydWU7XG4gICAgLy8gRGlzcGxheSBub3RpZmljYXRpb25cbiAgICBDYWxsb3V0U2VydmljZS5ub3RpZnkoe1xuICAgICAgbWVzc2FnZTogJ0xvY2F0aW9uIHNlcnZpY2Ugd2FzIG5vdCBhbGxvd2VkLCBwbGVhc2UgcHJvdmlkZSBkZXRhaWxzIHRvIGRpc3BsYXkgd2VhdGhlcicsXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IEdldCB3ZWF0aGVyIG1hbnVhbGx5XG4gIC8vIEhlbHBlciBtZXRob2QgdG8gZ2V0IHRoZSB3ZWF0aGVyIHVzaW5nIHppcCBhbmQgY291bnRyeSBjb2RlXG4gIHNlbGYuZ2V0V2VhdGhlck1hbnVhbGx5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBHZXQgd2VhdGhlciBmb3IgY291bnRyeSBjb2RlIGFuZCB6aXBjb2RlIGFuZCBkaXNwbGF5IGRhdGFcbiAgICBXZWF0aGVyU2VydmljZS5nZXRXZWF0aGVyKHtcblxuICAgICAgJ3ppcCc6IHNlbGYuemlwY29kZSxcbiAgICAgICdjb3VudHJ5Jzogc2VsZi5jb3VudHJ5XG5cbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgLy8gSWYgdGhlIGNvdW50cnkgY29kZSAmIHppcCBjb2RlIGNvbWJpbmF0aW9uIGRpZG4ndCByZXR1cm4gYW55IHJlc3VsdHNcbiAgICAgIGlmKHJlc3BvbnNlLmNvZCAhPSAyMDApIHtcblxuICAgICAgICBDYWxsb3V0U2VydmljZS5ub3RpZnkoe1xuICAgICAgICAgIHR5cGU6ICdhbGVydCcsXG4gICAgICAgICAgbWVzc2FnZTogJ05vIHdlYXRoZXIgZGF0YSBmb3IgcHJvdmlkZWQgbG9jYXRpb24nLFxuICAgICAgICAgIGltZzogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvdW5kaWNvbnMvMy4wLjAvc3Zncy9maS1hbGVydC5zdmcnXG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBPdGhlcndpc2Ugc2V0IHRoZSBkYXRhIGFuZCBoaWRlIGZvcm1cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gU2VuZCBhIG5vdGlmaWNhdGlvbiBhYm91dCBzdWNjZXNzXG4gICAgICAgIENhbGxvdXRTZXJ2aWNlLm5vdGlmeSh7XG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIG1lc3NhZ2U6ICdXZWF0aGVyIGRhdGEgc3VjY2Vzc2Z1bGx5IGZldGNoZWQnLFxuICAgICAgICAgIGltZzogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvdW5kaWNvbnMvMy4wLjAvc3Zncy9maS1jaGVjay5zdmcnLFxuICAgICAgICAgIHRpbWVvdXQ6IDIwMDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2V0IGRhdGFcbiAgICAgICAgc2VsZi53ZWF0aGVyRGF0YSA9IHJlc3BvbnNlO1xuICAgICAgICAvLyBIaWRlIGZvcm1cbiAgICAgICAgc2VsZi5nZW9FcnJvciA9IGZhbHNlO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn1dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
