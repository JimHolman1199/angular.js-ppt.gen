const math = require('./roundTo');

module.exports = class DrawTable {
    constructor(slide, settings, pptx) {
        this.slide = slide;
        this.settings = settings;
        this.pptx = pptx;
        this.tableY = 10;
        this.rectColors = {
            'intangible': 'b3dd6f',
            'tangible': 'f99380',
            'rational': 'f7e15c',
            'emotional': '19ccc7'
        }
    }

    // array['string']
    drawHeader(arr) {
        let x = 5;
        let y = '5%';
        arr.forEach((el, i) => {
            this.slide.addText(el, {
                x: x+'%',
                y: y,
                h: this.settings.h,
                w: this.settings.colW[i], 
                align: 'center', 
                color: this.settings.textColor,
                isTextBox: true, 
                bold: true,
                fontSize: 10,
                line: {color: this.settings.borderColor} 
            });
            x += parseInt(this.settings.colW[i]);
        });
    }

    drawRow(arr) {
        let y = this.tableY;
        let x = 5;
        arr.forEach((el, i) => {
            const rowSett = {
                x: x + '%',
                y: y + '%',
                h: this.settings.h,
                w: this.settings.colW[i], 
                align: 'center', 
                color: this.settings.textColor,
                isTextBox: true,
                fontSize: 10,
                autoFit: true,
                line: {color: this.settings.borderColor} 
            }
            
            if(el.type) {
                const maxW = parseInt(this.settings.colW[i]) / 2;
                const val = el.value / maxW * (100 / maxW);
                this.slide.addText(math.roundTo(el.value).toString(), {...rowSett, align: 'left'});
                this.drawRect( x+10, y+1.25, val, el.type);
            } else {
                this.slide.addText(el.toString(), rowSett);
            }

            x += parseInt(this.settings.colW[i]);
        });
        this.tableY += 5;
    }

    drawRect(x, y, w, colorType) {
        this.slide.addShape(this.pptx.ShapeType.rect, {
            x: x + '%',
            y: y + '%',
            h: this.settings.rectH,
            w: w + '%',
            fill: { color: this.rectColors[colorType] } 
        });
    }
}
