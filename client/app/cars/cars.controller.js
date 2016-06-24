var app;
(function (app) {
    var CarsController = (function () {
        function CarsController($rootScope, $scope, $http, service) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.service = service;
            this.cars = [];
            this.error = false;
            $scope.$on("$stateChangeSuccess", function () {
                _this.service.fetchCars().then(function (cars) {
                    console.log(cars);
                    _this.cars = cars;
                }).catch(function (err) {
                    console.error(err);
                    _this.error = true;
                });
            });
        }
        CarsController.prototype.deleteCar = function (car) {
            var _this = this;
            if (window.confirm("Really delete " + car.model + "?")) {
                this.service.deleteCar(car._id).then(function () {
                    alert("Successfully deleted " + car.model + ".");
                    var index = -1;
                    for (var i = 0; i < _this.cars.length; i++) {
                        if (_this.cars[i]._id === car._id)
                            index = i;
                    }
                    _this.cars.splice(index, 1);
                }).catch(function (err) {
                    alert("Could not delete car.");
                });
            }
        };
        return CarsController;
    }());
    app.CarsController = CarsController;
    angular.module('app').controller('CarsController', ["$rootScope", "$scope", "$http", "CarsService", CarsController]);
})(app || (app = {}));
