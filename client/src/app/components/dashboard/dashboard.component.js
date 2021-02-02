import template from './dashboard.component.html';
import './dashboard.component.scss';

class Controller {
    /** @ngInject */
    constructor(slideService, pptxService) {
        this._slideService = slideService;
        this._pptxService = pptxService;
        this.slideData;
        this.sortType;
        this.message;
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
        };
        this.getData();
    }

    getData() {
        this._slideService.getSlidesData().then(data => {
            this.slideData = data.data;
        }).catch(err => this.message = err.message);
    }

    onSortBy(newOrder) {
        this.sortType = newOrder;
        return this.slideData = this.slideData.sort(this.sortingOrder[newOrder]);
    }

    onAddTableChart() {
        try {
            this._pptxService.addTableChart(this.slideData);
            this.message = 'Table chart added to presentation';    
        } catch (error) {
            this.message = error.message;
        }
    }
}

Controller.$inject = ['slideService', 'pptxService']

export default {
    template,
    controller: Controller
};
