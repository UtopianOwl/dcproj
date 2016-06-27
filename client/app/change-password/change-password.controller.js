var app;
(function (app) {
    var ChangePasswordController = (function () {
        function ChangePasswordController($rootScope, $state) {
            this.$rootScope = $rootScope;
            this.$state = $state;
        }
        return ChangePasswordController;
    }());
    app.ChangePasswordController = ChangePasswordController;
    angular.module('app').controller('MainController', MainController);
})(app || (app = {}));