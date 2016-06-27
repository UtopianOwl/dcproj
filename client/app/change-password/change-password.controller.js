var app;
(function (app) {
    var ChangePasswordController = (function () {
        function ChangePasswordController($rootScope, $state) {
            this.$rootScope = $rootScope;
            this.$state = $state;
        }
        ChangePasswordController.prototype.changePassword = function(password) {
            var _this = this;
            this.UserService.changePassword(this.user, password).then(function () {
                _this.$state.go('main page');
            }, function (err) {
                console.error(err);
                if (err.message)
                    alert(err.message);
            });
        };
        }
        return ChangePasswordController;
    }());
    app.ChangePasswordController = ChangePasswordController;
    angular.module('app').controller('MainController', MainController);
})(app || (app = {}));