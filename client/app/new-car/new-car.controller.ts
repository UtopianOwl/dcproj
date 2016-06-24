namespace app {
    export class NewCarController {
        public car:ICar;
        public maxYear = new Date().getFullYear();
        public error = false;
        public success = false;

        constructor(public $rootScope:MyRootScope,
                    $scope: ng.IScope,
                    public service:app.CarsService) {
            $scope.$on("$stateChangeSuccess", () => {
               this.car.owner = this.$rootScope.user._id;
            });
        }

        createCar() {
            // Make a new car, and update the page afterwards
            this.service.createCar(this.car).then(() => {
                this.success = true;
            }).catch((err) => {
                console.error(err);
                this.error = true;
            });
        }
    }


    angular.module('app').controller('NewCarController', ["$rootScope", "$scope", "CarsService", NewCarController]);
}
