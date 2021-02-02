export default class DrawTable {
    constructor(slide, settings, pptx) {
        this.slide = slide;
        this.settings = settings;
        this.pptx = pptx;
        this.tableY = 10;
        this.rectColors = settings.rectColor;
    }

    drawHeader() {
        let x = 5;
        let y = 5;
        this.settings.headerArr.forEach((el, i) => {
            this.drawText(
                el,
                x,
                y,
                this.settings.colW[i],
                {bold: true, line: {color: this.settings.borderColor}}
            );
            x += parseInt(this.settings.colW[i]);
        });
    }

    drawRow(arr) {
        let y = this.tableY;
        let x = 5;
        arr.forEach((el, i) => {            
            if(el.type) {
                const maxW = parseInt(this.settings.colW[i]) / 2 + 5;
                const val = el.value / maxW * (100 / maxW);
                this.drawText(
                    this.roundTo(el.value).toString(),
                    x,
                    y,
                    this.settings.colW[i],
                    {align: 'left', line: {color: this.settings.borderColor} }
                );
                this.drawRect( x+20, y+1.25, val, el.type);
            } else {
                this.drawText(
                    el.toString(),
                    x,
                    y,
                    this.settings.colW[i],
                    {line: {color: this.settings.borderColor} }
                );
            }
            x += parseInt(this.settings.colW[i]);
        });
        this.tableY += 5;
    }

    drawAboutTable() {
        let x = 87;
        let y = 5;
        const text = Object.keys(this.rectColors);
        const colors = Object.values(this.rectColors);
        colors.forEach((el, i) => {
            // Draw colors
            this.slide.addShape(this.pptx.ShapeType.rect, {
                x: x + '%',
                y: y + '%',
                h: this.settings.rectH,
                w: this.settings.rectH,
                fill: { color: el }
            });
            // Draw text
            this.drawText(text[i], x+3, y, '8%', {h: this.settings.rectH});
            y += 5;
        });
    }

    /**
     * Draw rect shape
     * @param {number}   x  X axios.
     * @param {number}   y  Y axios.
     * @param {string}   w  Rect shape width.
     * @param {string}  str HEX for color
     * @return {void}
    */

    drawRect(x, y, w, colorType) {
        this.slide.addShape(this.pptx.ShapeType.rect, {
            x: x + '%',
            y: y + '%',
            h: this.settings.rectH,
            w: w + '%',
            fill: { color: this.rectColors[colorType] } 
        });
    }

    /**
     * Draw single text
     * @param {string} text Text
     * @param {number}   x  X axios.
     * @param {number}   y  Y axios.
     * @param {string}   w  Text box width.
     * @param {object}  {}  Object for additional settings or to rewrite base settings
     * @return {void}
    */
    drawText(text, x, y, w, obj = {}) {
        this.slide.addText(text, Object.assign({
            x: x + '%',
            y: y + '%',
            h: this.settings.h,
            w: w, 
            align: 'center', 
            color: this.settings.textColor,
            isTextBox: true, 
            fontSize: 10,
        }, obj));
    }

    roundTo(num) {
        return Math.round(num);
    }
}
