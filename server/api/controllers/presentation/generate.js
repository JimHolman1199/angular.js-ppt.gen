const PptxGenJS = require('pptxgenjs')

module.exports = {


  friendlyName: 'Presentaion',


  description: 'Presentaion generate file.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const pptx = new PptxGenJS();
    
    let slide = pptx.addSlide();
    let textboxText = "Hello World from PptxGenJS!";
    let textboxOpts = { x: 1, y: 1, color: '363636', fill: { color:'F1F1F1' }, align: pptx.AlignH.center };
    slide.addText(textboxText, textboxOpts);

    pptx.writeFile("presentation.pptx");
  
    return true;

  }


};
