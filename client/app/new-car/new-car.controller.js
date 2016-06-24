var app;
(function (app) {
    var NewCarController = (function () {
        function NewCarController($rootScope, $scope, service) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.service = service;
            this.maxYear = new Date().getFullYear();
            this.error = false;
            this.success = false;
            $scope.$on("$stateChangeSuccess", function () {
                _this.car.owner = _this.$rootScope.user._id;
            });
        }
        NewCarController.prototype.createCar = function () {
            var _this = this;
            this.service.createCar(this.car).then(function () {
                _this.success = true;
            }).catch(function (err) {
                console.error(err);
                _this.error = true;
            });
        };
        return NewCarController;
    }());
    app.NewCarController = NewCarController;
    angular.module('app').controller('NewCarController', ["$rootScope", "$scope", "CarsService", NewCarController]);
})(app || (app = {}));
