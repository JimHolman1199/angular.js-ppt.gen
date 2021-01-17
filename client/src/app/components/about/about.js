import template from './about.html'
import styles from './styles.scss'

class Controller {
    /** @ngInject */
    constructor() {
        this.styles = styles;
    }
}

export default {
    template,
    controller: Controller
};
