import template from './signUp.component.html';
import './signUp.component.scss';

import { removeNoise, generateNoise } from '../js/helper';
import { EMAIL_REGEX } from '../../../constants/constants';

export default class Controller {
  /** @ngInject */
  constructor(authService, $scope) {
    this._scope = $scope;
    this._authService = authService;
    this.removeNoise = removeNoise;
    this.generateNoise = generateNoise;
    this.user = {
      role: 'user'
    };
    this.emailPattern = EMAIL_REGEX;
  }

  onSignUp() {
    this._authService.signUp(this.user)
      .then(res => {
        this._scope.$parent.$close(res.data);
      });
  }
}

Controller.$inject = ['authService', '$scope'];

// export default {
//   template,
//   controller: Controller
// };
