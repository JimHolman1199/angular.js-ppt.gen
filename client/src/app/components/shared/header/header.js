import template from './header.html'
import styles from './styles.scss'

import { COMPANY_NAME } from '../../../constants/constants'

class controller {
    /** @ngInject */
    constructor() {
        this.styles = styles;
        this.name = COMPANY_NAME;
    }
}

export default {
    template,
    controller
};
