describe('MainController', function() {

  beforeEach(module('WeatherApp'));

  var WeatherService;
  beforeEach(inject(function(WeatherService) {
    WeatherService = WeatherService;
  }));

  it('should display weather for a specified postcode', function() {

    // Ask service for the weather
    WeatherService.getWeather({

      'zip': 'G128QQ',
      'country': 'uk'

    }).then(function(response) {

      console.log(response);

    });

    /*calloutService.subscribe($scope, function(event, status) {
      expect(status).toEqual({
        type: 'success',
        message: 'Success callout!',
        img: 'imgUrlHere'
      })
    })*/

  });

})
