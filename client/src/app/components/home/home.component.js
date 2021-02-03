import template from './home.component.html';
import './home.component.scss';
import * as FileSaver from 'file-saver';

class Controller {
    /** @ngInject */
    constructor(slideService) {
        this._slideService = slideService;
    }
}

Controller.$inject = ['slideService']

export default {
    template,
    controller: Controller
};
