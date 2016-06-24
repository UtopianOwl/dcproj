// We extends $rootScope so we can have an active reference to our logged-in user
interface MyRootScope extends ng.IRootScopeService {
    user:IUser;
}

namespace app {
    export class UserService {
        public status = {
            _id: '',
            email: ''
        };

        private static _requireAuth($rootScope:MyRootScope, $state:ng.ui.IStateService, UserService:UserService) {
            // Force users to login if not logged in
            // If we saved the login info let's auto-login
            let u:IUser = $rootScope.user;

            if (u == null) $state.go("login");
        }

        public static requireAuth = ["$rootScope", "$state", "UserService", UserService._requireAuth];

        private saveUser(u:IUser) {
            // Put user in rootscope so we can update nav menu
            this.$rootScope.user = u;
        }

        public login(u:IUser) {
            let q = this.$q.defer();
            this.$http.post('/api/v1/users/login', u).then((res) => {
                this.setToken(res.data['token']);
                this.saveUser(u);
                this.$rootScope.user = res.data['user'];
                this.setUser();
                q.resolve();
            }, (err) => {
                q.reject(err);
            });
            return q.promise;
        }

        public register(u:IUser) {
            let q = this.$q.defer();
            this.$http.post('/api/v1/users/register', u).then((res) => {
                this.setToken(res.data['token']);
                this.setUser();
                q.resolve();
            }, (err) => {
                q.reject(err);
            });
            return q.promise;
        }

        public logout() {
            this.$window.localStorage.removeItem('token');
            this.status._id = '';
            this.status.email = '';
        }

        public setUser() {
            let u = JSON.parse(this.urlBase64Decode(this.$window.localStorage.getItem('token').split('.')[1]));
            this.status._id = u._id;
            this.status.email = u.email;
        }

        public getToken() {
            return this.$window.localStorage.getItem('token');
        }

        public setToken(token:string) {
            this.$window.localStorage.setItem('token', token);
        }

        private urlBase64Decode(str) {
            let output = str.replace(/-/g, '+').replace(/_/g, '/');
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
            return decodeURIComponent(encodeURIComponent(this.$window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
        }

        constructor(private $http:ng.IHttpService,
                    private $q:ng.IQService,
                    private $window:ng.IWindowService,
                    private $rootScope:MyRootScope) {
            if (this.getToken()) this.setUser();
        }
    }

    angular.module('app').service("UserService", UserService);
}
