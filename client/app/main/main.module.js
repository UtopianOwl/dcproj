var app;
(function (app) {
    angular.module('app').config(function ($stateProvider) {
        $stateProvider
            .state('main page', {
            url: '/',
            templateUrl: '/client/app/main/main.html',
            controller: 'MainController as vm',
            onEnter: app.UserService.requireAuth
        })
            .state('logout', {
            url: '/logout',
            controller: function ($rootScope, $state) {
                $rootScope.user = undefined;
                $state.go("login");
            }
        });
    });
})(app || (app = {}));
