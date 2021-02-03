import template from './snackbar.directive.html';
import './snackbar.directive.scss';

class Snackbar {
    /** @ngInject */
    constructor($timeout, $rootScope) {
        this.$timeout = $timeout;
        this._rootScope = $rootScope;
        this.controller = () => this;
        this.controllerAs = '$ctrl1';
        this.bindToController = {
            message: '=',
        };
        this.template = template;
        this.timeoutPromise;
        this.oldValue;
        this.newValue;
        this.$doCheck = function () {
            this.oldValue = this.newValue;
            this.newValue = this.message;
            if(this.newValue !== this.oldValue) {
                this.open();
            }   
        };

        $rootScope.$watch('message', (msg) => {
            this.message = msg;
        }, true);
    }

    open() {
        this.timeoutPromise = this.$timeout(function() {
            this.close();
        }.bind(this), 2000);
    }

    close() {
        this.$timeout.cancel(this.timeoutPromise);
        this.message = '';
        this._rootScope.message = false; 
    }

    static SnackbarFactory($timeout, $rootScope) {
        let service = new Snackbar($timeout, $rootScope);
        return service;
    }
}

Snackbar.$inject = ['$timeout', ' $rootScope'];

export default Snackbar;
