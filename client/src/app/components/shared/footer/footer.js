import template from './footer.html'
import styles from './styles.scss'

import { COMPANY_NAME } from '../../../constants/constants'

class controller {
    /** @ngInject */
    constructor() {
        this.styles = styles;
        this.currentYear = this.getYear();
        this.name = COMPANY_NAME;
    }

    getYear() {
        return new Date().getFullYear()
    }
}

export default {
    template,
    controller
};
