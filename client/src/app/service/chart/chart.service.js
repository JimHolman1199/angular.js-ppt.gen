import Highcharts from 'highcharts';

export class ChartService {
  constructor() {}

  renderLineChart(container, data, title) {
    Highcharts.chart(container, {
      title: {
        text: title
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      },
      xAxis: {
        title: {
          text: 'Year'
        },
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1950
        }
      },
      series: data,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }

  renderColumnChart(container, data, title) {
    Highcharts.chart(container, {
      chart: {
        type: 'column'
      },
      title: {
        text: title
      },
      credits: {
        enabled: false
      },
      series: data
    });
  }

  renderPieChart(container, data, title) {
    Highcharts.chart(container, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Default data',
        colorByPoint: true,
        data: data
      }]
    });
  }

  static ChartServiceFactory() {
    let service = new ChartService();
    return service;
  }
}
