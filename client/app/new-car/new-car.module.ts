namespace app {
    angular.module('app').config((
        $stateProvider: ng.ui.IStateProvider
    ) => {
        $stateProvider
            .state('new-car', {
                url: '/new-car',
                templateUrl: '/client/app/new-car/new-car.html',
                controller: 'NewCarController as vm',
                onEnter: app.UserService.requireAuth
            })
    });
}
