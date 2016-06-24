namespace app {
    export class CarsController {
        public cars: ICar[] = [];
        public error = false;

        constructor(public $rootScope: MyRootScope,
            $scope: ng.IScope,
            public $http: ng.IHttpService,
            public service: app.CarsService) {
            // "stateChangeSuccess" lets me run code when we reach a state
            // https://github.com/angular-ui/ui-router/wiki
            $scope.$on("$stateChangeSuccess", () => {
                this.service.fetchCars().then((cars: ICar[]) => {
                    console.log(cars);
                    this.cars = cars;
                }).catch(err => {
                    console.error(err);
                    this.error = true;
                })
            });
        }

        deleteCar(car: ICar) {
            if (window.confirm(`Really delete ${car.model}?`)) {
                this.service.deleteCar(car._id).then(() => {
                    alert(`Successfully deleted ${car.model}.`);

                    // Find the index of the removed car
                    let index = -1;
                    for (let i = 0; i < this.cars.length; i++) {
                        if (this.cars[i]._id === car._id)
                            index = i;
                    }

                    // array.splice lets us remove from an array
                    this.cars.splice(index, 1);
                }).catch(err => {
                    alert("Could not delete car.");
                })
            }
        }
    }

    // Can't forget to inject my services
    angular.module('app').controller('CarsController', ["$rootScope", "$scope", "$http", "CarsService", CarsController]);
}
