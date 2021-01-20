import template from './header.component.html';
import './header.component.scss';

import { COMPANY_NAME } from '../../../constants/constants'

class Controller {
    /** @ngInject */
    constructor() {
        this.name = COMPANY_NAME;
    }
}

export default {
    template,
    controller: Controller
};
