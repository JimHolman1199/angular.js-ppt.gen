import DrawTable from './drawTable';

export class PptxService {
  constructor() {
    this.pptx = new PptxGenJS();

    // base Presentation settings
    this.pptx.author = 'Noname';
    this.pptx.company = 'Spoint';
    this.pptx.subject = 'Ped project';
    this.pptx.title = 'PptxGenJS Sample Presentation';
    this.pptx.defineSlideMaster({
      title: "MASTER_SLIDE",
      background: { color: "FFFFFF" },
      slideNumber: { x: 0.3, y: "90%" },
    });
  }

  addPieChart(data) {
    const slide = this.addMasterSlide();
    slide.addChart(this.pptx.ChartType.pie, data, {
      x:0.5, y:0.6, w:4.0, h:4.0,
      showLabel  : false,
      showValue  : false,
      showPercent: true,
      showLegend : true,
      chartColors: ['b3dd6f', 'f99380', 'f7e15c', '19ccc7'],
    });
  }

  addColumnChart(data) {
    const slide = this.addMasterSlide();
    slide.addChart(this.pptx.ChartType.bar, data, {
      x:0.5, y:0.5, w:'80%', h:'80%',
      showLegend: true,
      showDataTable: true,
      showDataTableKeys: true,
      showLabel: false,
      showValue: false,
      chartColors: ['b3dd6f', 'f99380', 'f7e15c', '19ccc7'],
    });
  }

  addLineChart(data) {
    const slide = this.addMasterSlide();
    slide.addChart(this.pptx.ChartType.line, data, {
      x:0.5, y:0.5, w:'80%', h:'80%',
      showLegend: true,
      showDataTable: true,
      showDataTableKeys: true,
      chartColors: ['b3dd6f', 'f99380', 'f7e15c', '19ccc7'],
    });
  }

  addScatterChart(data) {
    const slide = this.addMasterSlide();
    slide.addChart(this.pptx.ChartType.bubble, data, {
      x:0.5, y:0.5, w:'80%', h:'80%',
      catAxisTitle: "Absolute Value",
      valAxisTitle: "Value",
      showLegend: true,
      showDataTable: true,
      showDataTableKeys: true,
      chartColors: ['b3dd6f', 'f99380', 'f7e15c', '19ccc7']
    });
  }

  addTableChart(data) {
    const maxRowsPerSlide = 15;
    const tableSett = {
      headerArr: ['Rank', "Attributes", "Initial Consideration Set"],
      h: '5%',
      colW: {
        0: '5%',
        1: '35%',
        2: '40%'
      },
      rectH: '2.5%',
      borderColor: 'beb5af',
      textColor: '363636',
      rectColor: {
        'intangible': 'b3dd6f',
        'tangible': 'f99380',
        'rational': 'f7e15c',
        'emotional': '19ccc7',
      }
    };
    
    const slide = this.addMasterSlide();
    const drawTable = new DrawTable(
      slide,
      tableSett,
      this.pptx
    );
    drawTable.drawHeader();
    data.forEach((el, i) => {
      if(i < maxRowsPerSlide) {
        drawTable.drawRow([i+1, el.mdata, {type: el.type, value: el.value}]);
      }
    });
    drawTable.drawAboutTable();
  
    let slide1 = this.addMasterSlide();
    const drawTable1 = new DrawTable(
      slide1,
      tableSett,
      this.pptx
    );
    drawTable1.drawHeader();
    data.forEach((el, i) => {
      if(i >= maxRowsPerSlide) {
        drawTable1.drawRow([i+1, el.mdata, {type: el.type, value: el.value}]);
      }
    });
    drawTable1.drawAboutTable();
  }

  addMasterSlide() {
    return this.pptx.addSlide({ masterName: "MASTER_SLIDE" });
  }

  downloadPres(name = 'presentation') {
    return this.pptx.writeFile(name + '.pptx');
  }

  static PptxServiceFactory($http) {
    let service = new PptxService($http);
    return service;
  }
}
