var app;
(function (app) {
    angular.module('app').config(function ($stateProvider) {
        $stateProvider
            .state('change-password', {
            url: '/change-password',
            templateUrl: '/client/app/change-password/change-password.html',
            controller: 'ChangePasswordController as vm',
            onEnter: app.UserService.requireAuth
        });
    });
})(app || (app = {}));