const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const DrawTable = require('../../../assets/js/table');
const math = require('../../../assets/js/roundTo')

// module.exports = {
//   friendlyName: 'Presentaion',
//   description: 'Presentaion generate file.',
//   inputs: {
//   },
//   exits: {
//   },
//   fn: async function (inputs) {
//     let rawdata = await fs.readFileSync('changedData.json');
//     let parsedData = await JSON.parse(rawdata);
//     const maxRowsPerSlide = 15;
//     const tableSett = {
//       h: '5%',
//       colW: {
//         0: '5%',
//         1: '35%',
//         2: '40%'
//       },
//       rectH: '2.5%',
//       borderColor: 'beb5af',
//       textColor: '363636',
//     }
//     const pptx = new PptxGenJS();
//     pptx.author = 'Noname';
//     pptx.company = 'Spoint';
//     pptx.subject = 'Ped project';
//     pptx.title = 'PptxGenJS Sample Presentation';
    
//     let slide = pptx.addSlide();

//     const drawTable = new DrawTable(
//       slide,
//       tableSett,
//       pptx
//     );
//       // [TASK] optimaze here
//     drawTable.drawHeader(['Rank', "Attributes", "Initial Consideration Set"]);
//     parsedData.forEach((el, i) => {
//       if(i < maxRowsPerSlide) {
//         drawTable.drawRow([i+1, el.mdata, {type: el.type, value: el.value}])
//       }
//     });

//     let slide1 = pptx.addSlide();
//     const drawTable1 = new DrawTable(
//       slide1,
//       tableSett,
//       pptx
//     );
//     drawTable1.drawHeader(['Rank', "Attributes", "Initial Consideration Set"]);
//     parsedData.forEach((el, i) => {
//       if(i >= maxRowsPerSlide) {
//         drawTable1.drawRow([i+1, el.mdata, {type: el.type, value: el.value}])
//       }
//     });

//     pptx.write('base64')
//       .then(data => {
//         this.res.send(data)
//       }).catch(err => console.log(err));
//   }
// };

module.exports = async function generate(req, res) {

  let rawdata = await fs.readFileSync('changedData.json');
  let parsedData = await JSON.parse(rawdata);
  const maxRowsPerSlide = 15;
  const tableSett = {
    h: '5%',
    colW: {
      0: '5%',
      1: '35%',
      2: '40%'
    },
    rectH: '2.5%',
    borderColor: 'beb5af',
    textColor: '363636',
  }
  const pptx = new PptxGenJS();
  pptx.author = 'Noname';
  pptx.company = 'Spoint';
  pptx.subject = 'Ped project';
  pptx.title = 'PptxGenJS Sample Presentation';
  
  let slide = pptx.addSlide();

  const drawTable = new DrawTable(
    slide,
    tableSett,
    pptx
  );
    // [TASK] optimaze here
  drawTable.drawHeader(['Rank', "Attributes", "Initial Consideration Set"]);
  parsedData.forEach((el, i) => {
    if(i < maxRowsPerSlide) {
      drawTable.drawRow([i+1, el.mdata, {type: el.type, value: el.value}])
    }
  });

  let slide1 = pptx.addSlide();
  const drawTable1 = new DrawTable(
    slide1,
    tableSett,
    pptx
  );
  drawTable1.drawHeader(['Rank', "Attributes", "Initial Consideration Set"]);
  parsedData.forEach((el, i) => {
    if(i >= maxRowsPerSlide) {
      drawTable1.drawRow([i+1, el.mdata, {type: el.type, value: el.value}])
    }
  });

  pptx.writeFile('presentation.pptx')
    .then(file => {
      res.sendFile('/work/angularjs/angular.js-ppt.gen/server/presentation.pptx')
    }).catch(err => console.log(err));
}
