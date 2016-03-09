describe('WeatherService', function() {

  beforeEach(module('WeatherApp'));

  var wService,
      $httpBackend;

  beforeEach(inject(function($injector) {

    wService = $injector.get('WeatherService');
    $httpBackend = $injector.get('$httpBackend');

  }));

  it('should display weather for a specified postcode', function() {

    // Respond to any request with the object containing weather property
    $httpBackend.when('GET', /.*/).respond({weather: 'success'});

    // Ask service for the weather
    wService.getWeather({

      'zip': 'G128QQ',
      'country': 'uk'

    }).then(function(response) {

      // Check if service returns expected object
      expect(response).toEqual({
        weather: 'success'
      });

    });

    $httpBackend.flush();

  });

})
