namespace app {
  angular.module('app').directive('navbar', () => {
    return {
      templateUrl: '/client/components/navbar/navbar.html',
      controller: 'NavbarController as nav'
    }
  });
}
