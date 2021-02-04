import template from './dashboard.component.html';
import './dashboard.component.scss';
import XLSX from 'xlsx';

class Controller {
    /** @ngInject */
    constructor(slideService, pptxService, $rootScope) {
        this._slideService = slideService;
        this._pptxService = pptxService;
        this.slideData;
        this.sortType;
        this.message = $rootScope.message;
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

    onSaveAsXlsx() {
        //const wb = XLSX.utils.table_to_book(document.querySelector('table'));
        const ws = XLSX.utils.json_to_sheet(this.slideData);

		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, "table.xlsx");
    }
    
    onSaveAsCsv() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(this.slideData);
        XLSX.utils.book_append_sheet(wb, ws, 'test');
        XLSX.writeFile(wb, 'table.csv');
    }
}

Controller.$inject = ['slideService', 'pptxService', '$rootScope']

export default {
    template,
    controller: Controller
};
