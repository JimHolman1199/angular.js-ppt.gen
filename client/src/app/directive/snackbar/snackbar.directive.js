import template from './snackbar.directive.html'
import './snackbar.directive.scss'

class Snackbar {
    /** @ngInject */
    constructor($timeout) {
        this.$timeout = $timeout;
        this.controller = () => this;
        this.controllerAs = '$ctrl1';
        this.bindToController = {
            message: '=',
        };
        this.template = template;
        this.timeoutPromise;
        this.oldValue;
        this.newValue;
        this.state = false;
        this.$doCheck = function () {
            this.oldValue = this.newValue;
            this.newValue = this.message
            if(this.newValue !== this.oldValue) {
                this.open();
            }   
        }
    }

    open() {
        this.timeoutPromise = this.$timeout(function() {
            this.close();
        }.bind(this), 2000)
    }

    close() {
        this.$timeout.cancel(this.timeoutPromise)
        this.message = '';
    }

    static SnackbarFactory($timeout) {
        let service = new Snackbar($timeout);
        return service;
    }
}

Snackbar.$inject = ['$timeout']

export default Snackbar;

