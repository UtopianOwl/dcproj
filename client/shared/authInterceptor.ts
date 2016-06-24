namespace app {
  angular.module('app').factory('authInterceptor', function($window: ng.IWindowService) {
    return {
      request: function(config) {
        config.headers = config.headers || {};

        if($window.localStorage.getItem('token')) {
          config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
        }

        return config;
      }
    }
  });
}
