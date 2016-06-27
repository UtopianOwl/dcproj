var app;
(function (app) {
    var UserService = (function () {
        function UserService($http, $q, $window, $rootScope) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.$rootScope = $rootScope;
            this.status = {
                _id: '',
                email: ''
            };
            if (this.getToken())
                this.setUser();
        }
        UserService._requireAuth = function ($rootScope, $state, UserService) {
            var u = $rootScope.user;
            if (u == null)
                $state.go("login");
        };
        UserService.prototype.saveUser = function (u) {
            this.$rootScope.user = u;
        };
        UserService.prototype.login = function (u) {
            var _this = this;
            var q = this.$q.defer();
            this.$http.post('/api/v1/users/login', u).then(function (res) {
                _this.setToken(res.data['token']);
                _this.saveUser(u);
                _this.$rootScope.user = res.data['user'];
                _this.setUser();
                q.resolve();
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        UserService.prototype.register = function (u) {
            var _this = this;
            var q = this.$q.defer();
            this.$http.post('/api/v1/users/register', u).then(function (res) {
                _this.setToken(res.data['token']);
                _this.setUser();
                q.resolve();
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        UserService.prototype.changePassword = function (u, password) {
            var _this = this;
            u.password = password;
            var q = this.$q.defer();
            this.$http.put('/api/v1/users/' + u._id + '/change-password', u).then(function (res) {
                _this.setToken(res.data['token']);
                _this.setUser();
                q.resolve();
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        UserService.prototype.logout = function () {
            this.$window.localStorage.removeItem('token');
            this.status._id = '';
            this.status.email = '';
        };
        UserService.prototype.setUser = function () {
            var u = JSON.parse(this.urlBase64Decode(this.$window.localStorage.getItem('token').split('.')[1]));
            this.status._id = u._id;
            this.status.email = u.email;
        };
        UserService.prototype.getToken = function () {
            return this.$window.localStorage.getItem('token');
        };
        UserService.prototype.setToken = function (token) {
            this.$window.localStorage.setItem('token', token);
        };
        UserService.prototype.urlBase64Decode = function (str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
            case 0:
                {
                    break;
                }
            case 2:
                {
                    output += '==';
                    break;
                }
            case 3:
                {
                    output += '=';
                    break;
                }
            default:
                {
                    throw 'Illegal base64url string!';
                }
            }
            return decodeURIComponent(encodeURIComponent(this.$window.atob(output)));
        };
        UserService.requireAuth = ["$rootScope", "$state", "UserService", UserService._requireAuth];
        return UserService;
    }());
    app.UserService = UserService;
    angular.module('app').service("UserService", UserService);
})(app || (app = {}));