var app;
(function (app) {
    var ChangePasswordController = (function () {
        function ChangePasswordController(UserService, $rootScope, $state) {
            this.UserService = UserService;
            this.$rootScope = $rootScope;
            this.$state = $state;
        }
        ChangePasswordController.prototype.changePassword = function (oldPassword, newPassword, repeatPassword) {
            var _this = this;
//            if (oldPassword !== this.$rootScope.user.password) {
//                alert("That is not the current password!");
//                document.changePasswordForm.reset();
//                document.changePasswordForm.oldPassword.focus();
//            } else if (newPassword !== repeatPassword) {
//                alert("New passwords do not match!");
//                document.changePasswordForm.reset();
//                document.changePasswordForm.oldPassword.focus();
//            } else {
                this.UserService.changePassword(this.$rootScope.user, newPassword).then(function () {
                    _this.$state.go('main page');
                }, function (err) {
                    console.error(err);
                    if (err.message)
                        alert(err.message);
                });
//            }
        };
        return ChangePasswordController;
    }());
    app.ChangePasswordController = ChangePasswordController;
    angular.module('app').controller('ChangePasswordController', ChangePasswordController);
})(app || (app = {}));