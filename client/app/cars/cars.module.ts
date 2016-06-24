namespace app {
    angular.module('app').config((
        $stateProvider: ng.ui.IStateProvider
    ) => {
        $stateProvider.state('cars', {
            url: '/cars',
            templateUrl: '/client/app/cars/cars.html',
            controller: 'CarsController as vm',
            onEnter: app.UserService.requireAuth
        });
    });
}