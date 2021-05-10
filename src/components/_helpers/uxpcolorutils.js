import { DefaultPalette, CommunicationColors, NeutralColors, SharedColors } from '@fluentui/react/lib/Theme';
import { SemanticColors } from '@fluentui/react/lib/Styling';



export const UxpColors = {

    textColor: '#000000',
    pageColor: '#ffffff',

    //******  Greys  ******  
    black: '#000000',
    white: '#ffffff',
    grey700: '#2C2E2F',
    grey600: '#687173',
    grey500: '#9DA3A6',
    grey400: '#B7BCBF',
    grey300: '#CBD2D6',
    grey200: '#EAECED',
    grey100: '#F5F7FA',

    //******  Blues ******
    blue800: '#003087',
    blue700: '#005EA6',
    blue600: '#0070BA',
    blue500: '#009CDE',
    blue400: '#50C7F9',
    blue300: '#BFDBEE',
    blue200: '#E4F1FB',
    blue100: '#F5FBFE',

    //******  Accents  ******  

    //Greens
    green700: '#018065',
    green600: '#299976',
    green500: '#00CF92',
    green100: '#F5FDFB',

    //Oranges
    orange700: '#D64003',
    orange500: '#FF9600',
    orange300: '#FFBD5D',
    orange100: '#FFFBF5',

    //Reds
    red500: '#D20000',
    red100: '#FFF7F7',

    //Other
    purple500: '#640487',
    pink500: '#DE0063',

    //******  Semantic Colors  ****** 
    // A few key semantic colors
    info: '#0070BA',                //blue600,
    infoText: '#000000',           //Black,
    infoBackground: '#F5FBFE',      //blue100,
    infoBackgroundHover: '#E4F1FB',      //blue200,

    success: '#299976',             //green600,
    successText: '#000000',           //Black,
    successBackground: '#F5FDFB',   //green100,
    successBackgroundHover: '#DFE6E5',   //custom,

    warning: '#FF9600',             //orange500,
    warningText: '#000000',           //Black,
    warningBackground: '#FFFBF5',   //orange100,
    warningBackgroundHover: '#E8E5DF',   //custom,

    error: '#D20000',               //red500,
    errorText: '#000000',           //Black,
    errorBackground: '#FFF7F7',     //red100,
    errorBackgroundHover: '#E8E1E1',     //custom,


    /**
     * A convenience method for getting an set of params for a color token.
     * This set of params is useful for creating Microsoft Fluent Color objects.
     * Each param has the following properties: 
     *      - id: The shorter version of the token name. The consumer may override this, if desired. Example, 'blue-700'. 
     *      - label: The shorter version of the token name. Example, 'blue-700'.
     *      - colorToken: The actual longer token name. Example, '@color-blue-700'.
     *      - hex: The color's hex value. Example: '#2C2E2F'.
     *      - noPunctuation: The value of the short token name without spaces or dashes, and lower case. Great for doing matching on. Example, 'blue700'. 
     * @param {string}  colorLabel A short token name, such as 'grey-600' or 'blue-300'. 
     * @param {string}  hex A color hex value starting with the '#' mark. 
     * @example colorLabel: 'grey-500'
     * @example colorLabel: 'blue-300'
     * @returns {Object} Returns a parameterized object useful for holding info about a color. Attributes are: id, label, ppuiToken, and color (a Hex value).
     */
    getColorParams: function (colorLabel, hex) {
        //Normalize the incoming color label string
        let label = colorLabel.trim().toLowerCase().replace("@color-", "");
        let token = "@color-" + label.trim(); //token prefix
        let noPunct = label.replace("-", "").replace(" ", "");
        let h = hex.trim().toLowerCase()

        let params = ({
            id: label,
            label: label,
            colorToken: token,
            color: h,
            noPunctuation: noPunct,
        });
        return params;
    },

    /**
     * A convenience method for getting an array of color params for the  Blue palette.
     * Each param has an id (the short token name), a token-like name, the actual token name, and a hex value of the color. 
     * This array is useful for creating Microsoft Fluent Color objects. 
     * @returns {Array} Returns an array of Color Params objects with the  Blues palette. Attributes are: id, label, colorToken, and color (a Hex value).
     */
    getBlueColorList: function () {
        let b8 = this.getColorParams("blue-800", this.blue800);
        let b7 = this.getColorParams("blue-700", this.blue700);
        let b6 = this.getColorParams("blue-600", this.blue600);
        let b5 = this.getColorParams("blue-500", this.blue500);
        let b4 = this.getColorParams("blue-400", this.blue400);
        let b3 = this.getColorParams("blue-300", this.blue300);
        let b2 = this.getColorParams("blue-200", this.blue200);
        let b1 = this.getColorParams("blue-100", this.blue100);

        let palette = [b8, b7, b6, b5, b4, b3, b2, b1];
        return palette;
    },

    /**
     * A convenience method for getting an array of color params for the  Grey palette.
     * Each param has an id (the short token name), a token-like name, the actual token name, and a hex value of the color. 
     * This array is useful for creating Microsoft Fluent Color objects. 
     * @returns {Array} Returns an array of Color Params objects with the PayPal UI Greys palette. Attributes are: id, label, colorToken, and color (a Hex value).
     */
    getGreyColorList: function () {
        let b9 = this.getColorParams("black", this.black);
        let b8 = this.getColorParams("white", this.white);
        let b7 = this.getColorParams("grey-700", this.grey700);
        let b6 = this.getColorParams("grey-600", this.grey600);
        let b5 = this.getColorParams("grey-500", this.grey500);
        let b4 = this.getColorParams("grey-400", this.grey400);
        let b3 = this.getColorParams("grey-300", this.grey300);
        let b2 = this.getColorParams("grey-200", this.grey200);
        let b1 = this.getColorParams("grey-100", this.grey100);

        let palette = [b9, b8, b7, b6, b5, b4, b3, b2, b1];
        return palette;
    },

    /**
     * A convenience method for getting an array of color params for the  Accent palette.
     * Each param has an id (the short token name), a token-like name, the actual token name, and a hex value of the color. 
     * This array is useful for creating Microsoft Fluent Color objects. 
     * @returns {Array} Returns an array of Color Params objects with the PayPal UI Accents palette. Attributes are: id, label, colorToken, and color (a Hex value).
     */
    getAccentColorList: function () {
        let b12 = this.getColorParams("green-700", this.green700);
        let b11 = this.getColorParams("green-600", this.green600);
        let b10 = this.getColorParams("green-500", this.green500);
        let b9 = this.getColorParams("green-100", this.green100);

        let b8 = this.getColorParams("orange-700", this.orange700);
        let b7 = this.getColorParams("orange-500", this.orange500);
        let b6 = this.getColorParams("orange-300", this.orange300);
        let b5 = this.getColorParams("orange-100", this.orange100);

        let b4 = this.getColorParams("red-500", this.red500);
        let b3 = this.getColorParams("red-100", this.red100);

        let b2 = this.getColorParams("purples-500", this.purple500);
        let b1 = this.getColorParams("pink-500", this.pink500);

        let palette = [b12, b11, b10, b9, b8, b7, b6, b5, b4, b3, b2, b1];
        return palette;
    },


    /**
     * Returns the hex value for a short Color token name string, such as 'grey-500' or 'blue-300'.
     * @param {string} token A string representing the short token name for a color. 
     * @example 'grey-500'
     * @example 'blue-300'
     * @returns {string} For a valid color token name, such as 'blue-700', returns its Hex color value. Returns undefined if the value cannot be determined. 
     */
    getHexFromColorToken: function (token) {
        //First, normalize our incoming color value
        let t = token.trim().toLowerCase().replace("-", "").replace(" ", "").replace("gray", "grey");

        switch (t) {
            case "blue800":
                return this.blue800;
            case "blue700":
                return this.blue700;
            case "blue600":
                return this.blue600;
            case "blue500":
                return this.blue500;
            case "blue400":
                return this.blue400;
            case "blue300":
                return this.blue300;
            case "blue200":
                return this.blue200;
            case "blue100":
                return this.blue100;

            //Greys
            case "black":
                return this.black;
            case "white":
                return this.white;
            case "grey700":
                return this.grey700;
            case "grey600":
                return this.grey600;
            case "grey500":
                return this.grey500;
            case "grey400":
                return this.grey400;
            case "grey300":
                return this.grey300;
            case "grey200":
                return this.grey200;
            case "grey100":
                return this.grey100;

            //Accents
            //Green
            case "green700":
                return this.green700;
            case "green600":
                return this.green600;
            case "green500":
                return this.green500;
            case "green100":
                return this.green100;

            //Orange
            case "orange700":
                return this.orange700;
            case "orange500":
                return this.orange500;
            case "orange300":
                return this.orange300;
            case "orange100":
                return this.orange100;

            //Red
            case "red500":
                return this.red500;
            case "red100":
                return this.red100;

            //Other
            case "purple500":
                return this.purple500;
            case "pink500":
                return this.pink500;

            case 'transparent':
                return 'transparent';

            default:
                return undefined;
        }
    },


    /**
     * Use this method if the input string is unknown, and could either be a Hex value (with or without the #) or
     * a color token, such as 'blue-700'.
     * @example 'grey-500'
     * @example 'blue-300'
     * @example '#ffffff'
     * @example 'ffffff'
     * @example '#fff'
     * @example 'linear-gradient(120deg, #8D7749, #498D77)'
     * @example 'radial-gradient(#8D3749, #37EE77)'
     * @param {string} colorStr Either a Hex color value (with or without a #), or a  color token, such as 'blue-700'.
     * @returns {string} For a valid hex color value or a  color token name, such as 'blue-700', returns its Hex color value. 
     * For a gradient value, such as linear-gradient(#553749, #EE77), string will be returned as-is.
     */
    getHexFromHexOrToken: function (colorStr) {

        let gradientTypes = ['linear-gradient', 'radial-gradient'];

        if (colorStr) {
            //return parameter as-is if gradient value is provided.
            if (gradientTypes.some(type => colorStr.includes(type)))
                return colorStr;

            //Let's try matching against Fluent tokens first
            var color = this.getHexFromFluentToken(colorStr);
            if (color)
                return color;

            //Let's see if it's one of the other tokens. 
            color = this.getHexFromColorToken(colorStr);

            if (colorTokenHex)
                return colorTokenHex;

            //Else, let's see if it's already a valid hex value. 
            //First, remove the hash mark if it has one
            let h = colorStr.trim().toLowerCase().replace("#", '');

            let isHex = false;
            //Valid hex values can be 6 or 3 letters long. This doesn't work with alpha values. 
            if (h.length === 6 || h.length === 3) {
                isHex = typeof h === 'string'
                    && !isNaN(Number('0x' + h))
            }

            //If it's a hex, let's add a # back in and return it.
            if (isHex) {
                return "#" + h;
            }
        }

        //If we made it this far, it's not a hex value, or we can't easily figure it out. 
        return undefined;
    },

    getHexFromFluentToken: function (token) {

        //Let's cycle thru the palettes from MS
        var color = this.getHexFromFluentDefaultPalette(token);
        if (color)
            return color;

        color = this.getHexFromFluentSharedColors(token);
        if (color)
            return color;

        color = this.getHexFromFluentNeutralColors(token);
        if (color)
            return color;

        color = this.getHexFromFluentCommunicationColors(token);
        if (color)
            return color;

        return undefined;
    },

    getHexFromFluentDefaultPalette: function (token) {
        let palette = DefaultPalette;
        if (palette && token) {
            if (palette.hasOwnProperty(token)) {

                let color = palette[token];
                if (color)
                    return color;
            }
        }

        return undefined;
    },

    getHexFromFluentSharedColors: function (token) {
        let palette = SharedColors;
        if (palette && token) {
            if (palette.hasOwnProperty(token)) {

                let color = palette[token];
                if (color)
                    return color;
            }
        }

        return undefined;
    },

    getHexFromFluentNeutralColors: function (token) {
        let palette = NeutralColors;
        if (palette && token) {
            if (palette.hasOwnProperty(token)) {

                let color = palette[token];
                if (color)
                    return color;
            }
        }

        return undefined;
    },

    getHexFromFluentCommunicationColors: function (token) {
        let palette = CommunicationColors;
        if (palette && token) {
            if (palette.hasOwnProperty(token)) {

                let color = palette[token];
                if (color)
                    return color;
            }
        }

        return undefined;
    },

};