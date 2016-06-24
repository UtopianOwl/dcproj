var app;
(function (app) {
    angular.module('app').config(function ($stateProvider) {
        $stateProvider.state('cars', {
            url: '/cars',
            templateUrl: '/client/app/cars/cars.html',
            controller: 'CarsController as vm',
            onEnter: app.UserService.requireAuth
        });
    });
})(app || (app = {}));
