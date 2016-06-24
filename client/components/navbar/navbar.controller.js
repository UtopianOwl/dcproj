var app;
(function (app) {
    var NavbarController = (function () {
        function NavbarController(UserService) {
            this.UserService = UserService;
            this.status = UserService.status;
        }
        NavbarController.prototype.logout = function () {
            this.UserService.logout();
        };
        return NavbarController;
    }());
    app.NavbarController = NavbarController;
    angular.module('app').controller("NavbarController", NavbarController);
})(app || (app = {}));
