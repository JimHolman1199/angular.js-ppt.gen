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
          pointStart: 0
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

  renderScatterPlotChart(container, data, title) {
    Highcharts.chart(container, {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: title
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Value'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: 'Absolute value'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
              hover: {
                  marker: {
                    enabled: false
                  }
              }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} value, {point.y} a-value'
          }
        }
      },
      series: data
    });
  }

  static ChartServiceFactory() {
    let service = new ChartService();
    return service;
  }
}
