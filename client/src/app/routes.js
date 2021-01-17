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
    .state('app.about', {
      url: 'about',
      component: 'about'
    })
    .state('app.dashboard', {
      url: 'dashboard',
      component: 'dashboard'
    })

}
