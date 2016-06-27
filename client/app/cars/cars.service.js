var app;
(function (app) {
    var CarsService = (function () {
        function CarsService($rootScope, $q, $http) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$http = $http;
            this.cars = [];
        }
        CarsService.prototype.fetchCars = function () {
            var q = this.$q.defer();
            this.$http.get("/api/v1/users/" + this.$rootScope.user._id + "/cars").then(function (res) {
                q.resolve(res.data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        CarsService.prototype.createCar = function (car) {
            var q = this.$q.defer();
            this.$http.post("/api/v1/users/" + this.$rootScope.user._id + "/cars", car).then(function (res) {
                q.resolve(res);
            }).catch(function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        CarsService.prototype.deleteCar = function (id) {
            var q = this.$q.defer();
            this.$http.delete("/api/v1/cars/" + id).then(function () { return q.resolve(); }).catch(function (err) { return q.reject(err); });
            return q.promise;
        };
        CarsService.prototype.editCar = function (car) {
            return this.$http.put("/api/v1/cars/" + car._id, car).then(function (response) {
                return response.data;
            });
        }
        return CarsService;
    }());
    app.CarsService = CarsService;
    angular.module('app').service("CarsService", CarsService);
})(app || (app = {}));
