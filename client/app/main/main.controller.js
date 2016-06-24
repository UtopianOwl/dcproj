var app;
(function (app) {
    var MainController = (function () {
        function MainController($rootScope, $state) {
            this.$rootScope = $rootScope;
            this.$state = $state;
        }
        return MainController;
    }());
    app.MainController = MainController;
    angular.module('app').controller('MainController', MainController);
})(app || (app = {}));
