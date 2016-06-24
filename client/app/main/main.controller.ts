namespace app {
  export class MainController {

    constructor(
      private $rootScope: MyRootScope,
      private $state: ng.ui.IStateService
    ) {
    }
  }

  angular.module('app').controller('MainController', MainController);
}
