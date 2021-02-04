import angular from 'angular';
import template from './header.component.html';
import './header.component.scss';
import signInTemplate from "../../auth/sign-in/signIn.component.html";
import signUpTemplate from "../../auth/sign-up/signUp.component.html";
import { COMPANY_NAME } from '../../../constants/constants';

class Controller {
    /** @ngInject */
    constructor($uibModal, authService, localStorageService, $rootScope, $location) {
        this.name = COMPANY_NAME;
        this._rootScope =  $rootScope;
        this.authService = authService;
        this._localStorageService = localStorageService;
        this._location = $location;
        this.user = this.getUser();
        this._rootScope.user = this.user;
        this.isLoggedIn = this.user;
        this.actionType = {
            'sign-in': {
                template: signInTemplate,
                ctrl: 'appSignIn'
            },
            'sign-up': {
                template: signUpTemplate, 
                ctrl: 'appSignUp'
            }
        };
        const el = angular.element(document.querySelector('app-header'));
        const self = this;
        this.open = function (type) {
            const {template, ctrl} = this.actionType[type];
            const modalInstance = $uibModal.open({
                template: template,
                controller: ctrl,
                appendTo: el,
            });
        
            modalInstance.result.then(function (user) {
                self._rootScope.user = user;
                self.isLoggedIn = user;
            }, function (data) {
                console.log(11, data);
            });
        };
    }

    getUser() {
        return this._localStorageService.get('user');
    }

    onSignOut() {
        this.authService.signOut()
            .then(res => {
                this.isLoggedIn = null;
                this._rootScope.user = null;
                this._localStorageService.remove('user');
                this._location.path('/');
            });
    }
}

Controller.$inject = ['$uibModal', 'authService', 'localStorageService', '$rootScope', '$location'];

export default {
    template,
    controller: Controller
};
