import template from './snackbar.component.html'
import './snackbar.component.scss'

class Controller {
    /** @ngInject */
    constructor() {
        this.state = false;
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
