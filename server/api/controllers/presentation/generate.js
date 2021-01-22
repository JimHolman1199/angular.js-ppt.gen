const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const DrawTable = require('../../../assets/js/table');

module.exports = async function generate(req, res) {

  let rawdata = await fs.readFileSync('changedData.json');
  let parsedData = await JSON.parse(rawdata);
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
  }
  const pptx = new PptxGenJS();
  pptx.author = 'Noname';
  pptx.company = 'Spoint';
  pptx.subject = 'Ped project';
  pptx.title = 'PptxGenJS Sample Presentation';

  // [TASK] optimaze here

  let slide = pptx.addSlide();
  const drawTable = new DrawTable(
    slide,
    tableSett,
    pptx
  );
  drawTable.drawHeader();
  parsedData.forEach((el, i) => {
    if(i < maxRowsPerSlide) {
      drawTable.drawRow([i+1, el.mdata, {type: el.type, value: el.value}])
    }
  });
  drawTable.drawAboutTable();

  let slide1 = pptx.addSlide();
  const drawTable1 = new DrawTable(
    slide1,
    tableSett,
    pptx
  );
  drawTable1.drawHeader();
  parsedData.forEach((el, i) => {
    if(i >= maxRowsPerSlide) {
      drawTable1.drawRow([i+1, el.mdata, {type: el.type, value: el.value}])
    }
  });
  drawTable1.drawAboutTable();

  pptx.writeFile('presentation.pptx')
    .then(file => {
      res.sendFile('/work/angularjs/angular.js-ppt.gen/server/presentation.pptx')
    }).catch(err => console.log(err));
}
