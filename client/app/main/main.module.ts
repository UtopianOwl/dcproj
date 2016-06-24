namespace app {
    angular.module('app').config(($stateProvider:ng.ui.IStateProvider) => {
        $stateProvider
            .state('main page', {
                url: '/',
                templateUrl: '/client/app/main/main.html',
                controller: 'MainController as vm',
                onEnter: app.UserService.requireAuth
            })
            .state('logout', {
                url: '/logout',
                // Just a function that logs out and goes back to login
                controller: ($rootScope:MyRootScope, $state:ng.ui.IStateService) => {
                    $rootScope.user = undefined;
                    $state.go("login");
                }
            });
    });
}
