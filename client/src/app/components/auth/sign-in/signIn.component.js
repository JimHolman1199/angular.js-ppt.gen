import template from './signIn.component.html';
import './signIn.component.scss';

import { removeNoise, generateNoise } from '../js/helper';

export default class Controller {
  /** @ngInject */
  constructor(authService, localStorageService, $scope) {
    this._authService = authService;
    this._localStorageService = localStorageService;
    this._scope = $scope;
    this.removeNoise = removeNoise;
    this.generateNoise = generateNoise;
    this.user = {};
  }

  onSignIn() {
    console.log();
    this._authService.signIn(this.user)
      .then(res => {
        this._localStorageService.set('user', res.data);
        this._scope.$close(res.data);
      });
  }
}

Controller.$inject = ['authService', 'localStorageService', '$scope'];

// export default {
//   template,
//   controller: Controller
// };
