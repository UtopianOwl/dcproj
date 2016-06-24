namespace app {
    export class CarsService {
        public cars:ICar[] = [];

        fetchCars() {
            let q = this.$q.defer();
            this.$http.get(`/api/v1/users/${this.$rootScope.user._id}/cars`).then(res => {
                q.resolve(res.data);
            }, err => {
                q.reject(err);
            });
            return q.promise;
        }

        createCar(car:ICar) {
            let q = this.$q.defer();
            this.$http.post(`/api/v1/users/${this.$rootScope.user._id}/cars`, car).then(res => {
                q.resolve(res);
            }).catch(err => {
                q.reject(err);
            });
            return q.promise;
        }

        deleteCar(id:string) {
            let q = this.$q.defer();
            this.$http.delete(`/api/v1/cars/${id}`).then(() => q.resolve()).catch(err => q.reject(err));
            return q.promise;
        }

        constructor(private $rootScope:MyRootScope, private $q:ng.IQService, private $http:ng.IHttpService) {
            
        }
    }

    angular.module('app').service("CarsService", CarsService);
}