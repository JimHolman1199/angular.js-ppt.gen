import template from './dashboard.component.html';
import './dashboard.component.scss';
import { SlideService } from '../../service/slide/slide.service';

class Controller {
    /** @ngInject */
    constructor(slideService) {
        this._slideService = slideService;
        this.slideData;
        this.sortType;
        this.sortingOrder = {
            titleA: (a, b) => {
                let titleA = a.mdata.toUpperCase();
                let titleB = b.mdata.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                } else if (titleA > titleB) {
                    return 1;
                } else return 0;
            },
            titleD: (a, b) => {
                let titleA = a.mdata.toUpperCase();
                let titleB = b.mdata.toUpperCase();
                if (titleA < titleB) {
                    return 1;
                } else if (titleA > titleB) {
                    return -1;
                } else return 0;
            },
            valueA: (a, b) => a.value - b.value,
            valueD: (a, b) => b.value - a.value,
        }
        this.getData();
    }

    getData() {
        this._slideService.getSlidesData().then(data => {
            this.slideData = data.data.slideData;
        }).catch(err => console.log(err));
    }

    onSortBy(newOrder) {
        this.sortType = newOrder;
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
