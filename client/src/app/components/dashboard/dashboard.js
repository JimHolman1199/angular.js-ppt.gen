import template from './dashboard.html';
import styles from './styles.scss';
import { SlideService } from '../../service/slide/slide.service';

class Controller {
    /** @ngInject */
    constructor(slideService) {
        this.styles = styles;
        this._slideService = slideService;
        this.slideData;
        this.sortingOrder = {
            title: (a, b) => {
                let titleA = a.mdata.toUpperCase();
                let titleB = b.mdata.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                } else if (titleA > titleB) {
                    return 1;
                } else return 0;
            },
            value: (a, b) => a.value - b.value,
        }
        this.getData();
    }

    getData() {
        this._slideService.getSlidesData().then(data => {
            this.slideData = data.data.slideData;
        }).catch(err => console.log(err));
    }

    onSortBy(newOrder) {
        return this.slideData = this.slideData.sort(this.sortingOrder[newOrder]);
    }

    onSaveChanges() {
        return this._slideService.saveChanges(this.slideData)
            .then(res => console.log(res));
    }
}

Controller.$inject = ['slideService']

export default {
    template,
    controller: Controller
};
