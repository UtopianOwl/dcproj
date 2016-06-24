namespace app {
  export class NavbarController {
    public status;

    public logout() {
      this.UserService.logout();
    }

    constructor(
      private UserService: app.UserService
    ) {
      this.status = UserService.status;
    }
  }

  angular.module('app').controller("NavbarController", NavbarController);
}
