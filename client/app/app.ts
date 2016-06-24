namespace app {
  angular
    .module('app', ['ui.router', 'ngResource'])
    .config((
      $locationProvider: ng.ILocationProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $httpProvider: ng.IHttpProvider
    ) => {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      $httpProvider.interceptors.push('authInterceptor');
    });
}
