import template from './chart.component.html';
import './chart.component.scss';

class Controller {
  /** @ngInject */
  constructor(slideService, pptxService, chartService, $rootScope) {
    this._chartService = chartService;
    this._slideService = slideService;
    this._pptxService  = pptxService;
    this.message = $rootScope.message;
    this.data;
    this.catAndVal = [];
    this.types = [];
    this.getAndModifyData();

    this.chartColors = {
      'intangible': 'b3dd6f',
      'tangible': 'f99380',
      'rational': 'f7e15c',
      'emotional': '19ccc7',
    };
  }

  onRenderColumnChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = [];
    for (const property in groupedData) {
      result.push({name: property, data: groupedData[property]});
    }
    this._chartService.renderColumnChart('columnChart', result, 'Column chart');
  }

  onRenderPieChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = [];
    for (const property in groupedData) {
      result.push({name: property, y: groupedData[property].reduce((a,b)=>a+b,0)});
    }
    
    this._chartService.renderPieChart('pieChart', result, 'Pie chart');
  }

  onRenderLineChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = [];
    for (const property in groupedData) {
      result.push({name: property, data: groupedData[property]});
    }

    this._chartService.renderLineChart('lineChart', result, 'Line chart');
  }

  onRenderScatterPlotChart() {
    const _self = this;
    const result = this.data.reduce(function(rv, x) {
      if(!rv.some(el => el['name'] === x['type'])) {
        rv.push({
          color: '#' + _self.chartColors[x['type']],
          name: x['type'],
          data: [[parseFloat(x['value']), parseFloat(x['value_absolute'])]]
        });
      } else {
        rv.forEach(el => {
          if(el['name'] === x['type']) {
            el.data.push([parseFloat(x['value']), parseFloat(x['value_absolute'])]);
          }
        });
      }

      return rv;
    }, []);

    this._chartService.renderScatterPlotChart('scatterPlotChart', result, 'Scatter Plot Chart');
  }

  getAndModifyData() {
    this._slideService.getSlidesData()
      .then(data => {
        this.data = data.data;
        this.onRenderColumnChart();
        this.onRenderPieChart();
        this.onRenderLineChart();
        this.onRenderScatterPlotChart();
      });
  }
  
  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(parseFloat(x.value));
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
    this.message = 'Column chart added to presentation';
  }

  onAddPieChart() {
    const groupedData = this.groupBy(this.data, 'type');
    const result = {
      labels: [],
      values: []
    };
    for (const property in groupedData) {
      result.labels.push(property);
      result.values.push(groupedData[property].reduce((a,b)=>a+b,0));
    }
    this._pptxService.addPieChart([result]);
    this.message = 'Pie chart added to presentation';
  }

  onAddLineChart() {
    try {
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
  
      this._pptxService.addLineChart(result);
      this.message = 'Line chart added to presentation';
    } catch (error) {
      this.message = error.message;
    }
  }

  onAddScatterPlotChart() {
    try {
      const result = this.data.reduce(function(rv, x) {
        if(!rv.some(el => el['name'] === x['type'])) {
          rv.push({
            sizes: [x['value_absolute']],
            name: x['type'],
            values: [x['value']]
          })
        } else {
          rv.forEach(el => {
            if(el['name'] === x['type']) {
              el.sizes.push(x['value_absolute']);
              el.values.push(x['value']);
            }
          });
        }
  
        return rv;
      }, [{ name:'X-Axis', values: [1, 2, 3, 4, 5, 6, 7, 8, 9] }]);

      this._pptxService.addScatterChart(result);
      this.message = 'Scatter chart added to presentation';
    } catch (error) {
      this.message = error.message;
    }
  }

  onDownloadPres() {
    this._pptxService.downloadPres();
  }
}

Controller.$inject = ['slideService', 'pptxService', 'chartService', '$rootScope'];

export default {
    template,
    controller: Controller
};
