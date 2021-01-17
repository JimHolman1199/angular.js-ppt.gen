import template from './app.html'
import styles from './styles.scss'

class Controller {
    /** @ngInject */
    constructor(slideService) {
        this._slideService = slideService;
    }

    onGenerateFile() {
        this._slideService.generateSlidesFile()
            .then(res => console.log(res))
    }
}

Controller.$inject = ['slideService']

export default {
    template,
    controller: Controller
};
