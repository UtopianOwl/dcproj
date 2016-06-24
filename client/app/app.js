var app;
(function (app) {
    angular
        .module('app', ['ui.router', 'ngResource'])
        .config(function ($locationProvider, $urlRouterProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('authInterceptor');
    });
})(app || (app = {}));
