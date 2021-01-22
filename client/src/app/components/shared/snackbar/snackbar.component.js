import template from './snackbar.component.html'
import './snackbar.component.scss'

class Controller {
    /** @ngInject */
    constructor(message) {
        this.state = false;
        this.message = message;
    }

    open() {
        this.state = true;
    }

    close() {
        this.state = false;
    }
}

export default {
    template,
    controller: Controller
};
