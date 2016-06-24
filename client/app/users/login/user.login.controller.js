var app;
(function (app) {
    var UserLoginController = (function () {
        function UserLoginController(UserService, $state) {
            this.UserService = UserService;
            this.$state = $state;
        }
        UserLoginController.prototype.login = function () {
            var _this = this;
            this.UserService.login(this.user).then(function () {
                _this.$state.go('main page');
            }, function (err) {
                console.error(err);
                if (err.message)
                    alert(err.message);
            });
        };
        return UserLoginController;
    }());
    app.UserLoginController = UserLoginController;
    angular.module('app').controller('UserLoginController', UserLoginController);
})(app || (app = {}));
