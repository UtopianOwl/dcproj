namespace app {
  export class UserLoginController {
    public user: IUser;

    public login() {
      this.UserService.login(this.user).then(() => {
        this.$state.go('main page');
      }, (err) => {
        console.error(err);

          if (err.message)
            alert(err.message);
      });
    }

    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {

    }
  }
  angular.module('app').controller('UserLoginController', UserLoginController);
}
