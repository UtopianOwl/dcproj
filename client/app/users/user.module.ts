namespace app {
  angular.module('app').config((
    $stateProvider: ng.ui.IStateProvider
  ) => {
    $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: '/client/app/users/register/user.register.html',
      controller: 'UserRegisterController as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/client/app/users/login/user.login.html',
      controller: 'UserLoginController as vm'
    });
  });
}
