import template from './chart.component.html';
import './chart.component.scss';

class Controller {
  /** @ngInject */
  constructor(slideService, pptxService, chartService) {
    this._chartService = chartService
    this._slideService = slideService;
    this._pptxService  = pptxService;
    this.data;
    this.catAndVal = [];
    this.types = [];
    this.getAndModifyData();
  }

  onRenderColumnChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = [];
    for (const property in groupedData) {
      result.push({name: property, data: groupedData[property]})
    }
    this._chartService.renderColumnChart('columnChart', result, 'Column chart')
  }

  onRenderPieChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = [];
    for (const property in groupedData) {
      result.push({name: property, y: groupedData[property].reduce((a,b)=>a+b,0)})
    }
    
    this._chartService.renderPieChart('pieChart', result, 'Pie chart')
  }

  getAndModifyData() {
    this._slideService.getSlidesData()
      .then(data => {
        this.data = data.data.slideData;
        this.onRenderColumnChart();
        this.onRenderPieChart();
      });
  }
  
  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x.value);
      return rv;
    }, {});
  }

  onAddColumnChart() {
    const result = this.data.reduce(function(rv, x) {
      if(!rv.some(el => el['name'] === x['type'])) {
        rv.push({
          labels: [x['mdata'].substring(0,1)],
          name: x['type'],
          values: [x['value']]
        })
      } else {
        rv.forEach(el => {
          if(el['name'] === x['type']) {
            el.labels.push(x['mdata'].substring(0,1));
            el.values.push(x['value']);
          }
        });
      }

      return rv;
    }, []);

    this._pptxService.addColumnChart(result);
  }

  onAddPieChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = {
      labels: [],
      values: []
    };
    for (const property in groupedData) {
      result.labels.push(property);
      result.values.push(groupedData[property].reduce((a,b)=>a+b,0))
    }
    this._pptxService.addPieChart([result]);
  }

  onDownloadPres() {
    this._pptxService.downloadPres();
  }
}

Controller.$inject = ['slideService', 'pptxService', 'chartService'];

export default {
    template,
    controller: Controller
};
