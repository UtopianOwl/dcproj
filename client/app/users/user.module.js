var app;
(function (app) {
    angular.module('app').config(function ($stateProvider) {
        $stateProvider
            .state('register', {
            url: '/register',
            templateUrl: '/client/app/users/register/user.register.html',
            controller: 'UserRegisterController as vm'
        })
            .state('login', {
            url: '/login',
            templateUrl: '/client/app/users/login/user.login.html',
            controller: 'UserLoginController as vm'
        });
    });
})(app || (app = {}));
