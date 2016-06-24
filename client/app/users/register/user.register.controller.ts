namespace app {
  export class UserRegisterController {
    public user: IUser;
    public confirm_password: String;

    public register() {
      if (!this.validate()) {
        alert("Please make sure all fields are complete.");
      } else {
        this.UserService.register(this.user).then((res) => {
          this.$state.go('login');
        }, (err) => {
          console.error(err);

          if (err.message)
            alert(err.message);
        });
      }
    }

    /**
     * Ensures all fields are completed
     */
    private validate(): boolean {
      const fields = [
        this.confirm_password,
        this.user.email,
        this.user.fullname,
        this.user.username,
        this.user.password,
      ];

      for (let i: number = 0; i < fields.length; i++) {
        if (fields[i] == null || fields[i].trim().length == 0)
          return true;
      }

      if (this.confirm_password.trim() !== this.user.password.trim()) {
        alert("The two given passwords must match.");
        return false;
      }

      return true;
    }

    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {

    }
  }

  angular.module('app').controller('UserRegisterController', UserRegisterController);
}
