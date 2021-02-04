export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('app.dashboard', {
      url: 'dashboard',
      component: 'dashboard',
      resolve: {
        access: ["accessGuard", function (AccessGuard) { return AccessGuard.isAuthenticated(); }],
      }
    })
    .state('app.chart', {
      url: 'charts',
      component: 'chart',
      resolve: {
        access: ["accessGuard", function (AccessGuard) { return AccessGuard.isAuthenticated(); }],
      }
    })
    .state('app.admin', {
      url: 'admin',
      component: 'admin',
      resolve: {
        access: ["accessGuard", function (AccessGuard) { return AccessGuard.isAdmin(); }],
      }
    });
}
