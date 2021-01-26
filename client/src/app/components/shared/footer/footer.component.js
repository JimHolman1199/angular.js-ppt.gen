import template from './footer.component.html';
import './footer.component.scss';

import { COMPANY_NAME } from '../../../constants/constants';

class Controller {
    /** @ngInject */
    constructor() {
        this.currentYear = this.getYear();
        this.name = COMPANY_NAME;
    }

    getYear() {
        return new Date().getFullYear()
    }
}

export default {
    template,
    controller: Controller
};
