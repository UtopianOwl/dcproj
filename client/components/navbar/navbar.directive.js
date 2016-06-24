var app;
(function (app) {
    angular.module('app').directive('navbar', function () {
        return {
            templateUrl: '/client/components/navbar/navbar.html',
            controller: 'NavbarController as nav'
        };
    });
})(app || (app = {}));
