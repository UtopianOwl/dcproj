var app;
(function (app) {
    var UserRegisterController = (function () {
        function UserRegisterController(UserService, $state) {
            this.UserService = UserService;
            this.$state = $state;
        }
        UserRegisterController.prototype.register = function () {
            var _this = this;
            if (!this.validate()) {
                alert("Please make sure all fields are complete.");
            }
            else {
                this.UserService.register(this.user).then(function (res) {
                    _this.$state.go('login');
                }, function (err) {
                    console.error(err);
                    if (err.message)
                        alert(err.message);
                });
            }
        };
        UserRegisterController.prototype.validate = function () {
            var fields = [
                this.confirm_password,
                this.user.email,
                this.user.fullname,
                this.user.username,
                this.user.password,
            ];
            for (var i = 0; i < fields.length; i++) {
                if (fields[i] == null || fields[i].trim().length == 0)
                    return true;
            }
            if (this.confirm_password.trim() !== this.user.password.trim()) {
                alert("The two given passwords must match.");
                return false;
            }
            return true;
        };
        return UserRegisterController;
    }());
    app.UserRegisterController = UserRegisterController;
    angular.module('app').controller('UserRegisterController', UserRegisterController);
})(app || (app = {}));
