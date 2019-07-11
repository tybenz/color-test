export default class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        this.toHex = function () {
            return parseInt(r, 16) + parseInt(g, 16) + parseInt(b, 16);
        };
    }

    toHSL() {
        let { r, g, b } = this;

        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h, s, l };
    }

    getComplementary() {
        let { h, s, l } = this.toHSL();

        console.log('DEBUG', h, s, l);

        // Shift hue to opposite side of wheel and convert to [0-1] value
        h += 180;
        if (h > 360) { h -= 360; }
        h /= 360;

        // convert hsl back to rgb
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            let hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        r = Math.round(r * 255);
        g = Math.round(g * 255); 
        b = Math.round(b * 255);

        return new Color(r, g, b);
    }
};
