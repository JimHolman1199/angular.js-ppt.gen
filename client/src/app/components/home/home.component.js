import template from './home.component.html';
import './home.component.scss';
import * as FileSaver from 'file-saver';

class Controller {
    /** @ngInject */
    constructor(slideService) {
        this._slideService = slideService;
        this.loading = false;
    }

    onGenerateFile() {
        this.loading = true;
        this._slideService.generateSlidesFile()
            .then(res => {
                var blob = new Blob([res.data], {type: 'application/zip'});
                FileSaver.saveAs(blob, 'presentation.pptx');
                this.loading = false;
            });
    }
}

Controller.$inject = ['slideService']

export default {
    template,
    controller: Controller
};
