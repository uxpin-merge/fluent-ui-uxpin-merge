

export const MaterialUIPalette = {

    // //******  Greys  ******  
    black: '#000000',
    white: '#ffffff',
    transparent: 'transparent',

    //******  Semantic Colors  ****** 
    // A few key semantic colors
    info: '#1e88e5',                //Material UI Blue 600
    infoText: '#000000',           //Black,
    infoBackground: '#bbdefb',      //Material UI Blue 100
    infoBackgroundHover: '#90caf9',      //Material UI Blue 200

    success: '#388e3c',             //Material UI Green 700
    successText: '#000000',           //White
    successBackground: '#e8f5e9',   //Material UI Green 50
    successBackgroundHover: '#c8e6c9',   //Material UI Green 200

    warning: '#fb8c00',             //Material UI Orange 600
    warningText: '#000000',           //Black
    warningBackground: '#ffe0b2',   //Material UI Orange 100
    warningBackgroundHover: '#ffcc80',   //Material UI Orange 200

    error: '#e53935',               //Material UI Red 600
    errorText: '#000000',           //Black,
    errorBackground: '#ffcdd2',     //Material UI Red 100
    errorBackgroundHover: '#ef9a9a',     //Material UI Red 200

    blue: {
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
        a100: '#82b1ff',
        a200: '#448aff',
        a400: '#2979ff',
        a700: '#2962ff',
    },

    red: {
        50: '#ffebee',
        100: '#ffcdd2',
        200: '#ef9a9a',
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
        a100: '#ff8a80',
        a200: '#ff5252',
        a400: '#ff1744',
        a700: '#d50000',
    },

    pink: {
        50: '#fce4ec',
        100: '#f8bbd0',
        200: '#f48fb1',
        300: '#f06292',
        400: '#ec407a',
        500: '#e91e63',
        600: '#d81b60',
        700: '#c2185b',
        800: '#ad1457',
        900: '#880e4f',
        a100: '#ff80ab',
        a200: '#ff4081',
        a400: '#f50057',
        a700: '#c51162',
    },

    purple: {
        50: '#f3e5f5',
        100: '#e1bee7',
        200: '#ce93d8',
        300: '#ba68c8',
        400: '#ab47bc',
        500: '#9c27b0',
        600: '#8e24aa',
        700: '#7b1fa2',
        800: '#6a1b9a',
        900: '#4a148c',
        a100: '#ea80fc',
        a200: '#e040fb',
        a400: '#d500f9',
        a700: '#aa00ff',
    },

    green: {
        50: '#e8f5e9',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
        a100: '#b9f6ca',
        a200: '#69f0ae',
        a400: '#00e676',
        a700: '#00c853',
    },

    yellow: {
        50: '#fffde7',
        100: '#fff9c4',
        200: '#fff59d',
        300: '#fff176',
        400: '#ffee58',
        500: '#ffeb3b',
        600: '#fdd835',
        700: '#fbc02d',
        800: '#f9a825',
        900: '#f57f17',
        a100: '#ffff8d',
        a200: '#ffff00',
        a400: '#ffea00',
        a700: '#ffd600',
    },

    orange: {
        50: '#fff3e0',
        100: '#ffe0b2',
        200: '#ffcc80',
        300: '#ffb74d',
        400: '#ffa726',
        500: '#ff9800',
        600: '#fb8c00',
        700: '#f57c00',
        800: '#ef6c00',
        900: '#e65100',
        a100: '#ffd180',
        a200: '#ffab40',
        a400: '#ff9100',
        a700: '#ff6d00',
    },

    grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },

    /**
     * This is the main entry point for all supported color parsing, whether for Material UI tokens or hex values. Use this method if the input string is unknown, and could either be a Hex value (with or without the #) or a color token, such as 'blue-700'.
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

            //Let's see if it's a Hex value. 
            var colorHex = this.getHexFromHex(colorStr);
            if (colorHex)
                return colorHex;

            //Let's see if it's one of the tokens.
            //If it's not, this method returns undefined, as preferred.
            return this.getHexFromColorToken(colorStr);
        }

        //If we made it this far, it's not a hex value, or we can't easily figure it out. 
        return undefined;
    },

    /**
     * Returns the hex value for a short Color token name string, such as 'grey-500' or 'blue-300'. Includes support for Microsoft Fluent color tokens.
     * @param {string} token A string representing the short token name for a color. 
     * @example 'grey-500'
     * @example 'blue-300'
     * @example 'themePrimary'
     * @example 'neutralSecondary'
    * @returns {string} For a valid color token name, such as 'blue-700', returns its Hex color value. Returns undefined if the value cannot be determined. 
     */
    getHexFromColorToken: function (token) {
        //Let's try matching against Fluent tokens
        let fToken = this.getHexFromMaterialToken(token);
        if (fToken)
            return fToken;

        //First, normalize our incoming color value
        let t = token.trim().toLowerCase().replace("-", "").replace(" ", "");

        switch (t) {
            case "black":
                return this.black;
            case "white":
                return this.white;

            //Role-specific colors
            case "info":
                return this.info;
            case "infotext":
                return this.infoText;
            case "infobackground":
                return this.infoBackground;
            case "infobackgroundhover":
                return this.infoBackgroundHover;

            case "success":
                return this.success;
            case "successtext":
                return this.successText;
            case "successbackground":
                return this.successBackground;
            case "successbackgroundhover":
                return this.successBackgroundHover;

            case "warning":
                return this.warning;
            case "warningtext":
                return this.warningText;
            case "warningbackground":
                return this.warningBackground;
            case "warningbackgroundhover":
                return this.warningBackgroundHover;

            case "error":
                return this.error;
            case "errortext":
                return this.errorText;
            case "errorbackground":
                return this.errorBackground;
            case "errorbackgroundhover":
                return this.errorBackgroundHover;

            case 'transparent':
                return 'transparent';

            default:
                return undefined;
        }
    },


    /**
     * A convenience method for getting a Material UI color palette by name, such as 'blue' or 'grey'. The palette includes all numbered values, typically from 50-900, plus the A series, if supported. Returns undefined if the palette is not found or not supported. 
     * @param {string} token A color palette name, such as 'blue' or 'grey'. 
     * @example token: 'grey'
     * @example token: 'blue'
     * @returns {Object} A Material UI color palette including all numbered values, typically from 50-900, plus the A series, if supported. Returns undefined if the palette is not found or not supported. 
     */
    getColorPaletteByName: function (token) {
        if (token) {
            let color = token.trim().toLowerCase().replace("gray", "grey");
            let colorPalette = color === 'blue' ? blue :
                color === 'red' ? red :
                    color === 'pink' ? pink :
                        color === 'purple' ? purple :
                            color === 'green' ? green :
                                color === 'yellow' ? yellow :
                                    color === 'orange' ? orange :
                                        color === 'grey' ? grey :
                                            undefined;
            return colorPalette;
        }

        return undefined;
    },

    /**
     * Returns the hex value for a short Color token name string, such as 'grey-500' or 'blue-300'.
     * @param {string} token A string representing the short token name for a color. 
     * @example 'grey-500'
     * @example 'blue-300'
     * @returns {string} For a valid color token name, such as 'blue-700', returns its Hex color value. Returns undefined if the value cannot be determined. 
     */
    getHexFromMaterialToken: function (token) {
        var returnVal = undefined;

        if (token) {
            //First, normalize our incoming color value
            let normalized = token.trim().toLowerCase().replace("-", " ").replace("  ", " ");

            let tokens = normalized.split(" ");

            //We need 2 tokens, but 1 is OK
            if (tokens && tokens.length > 0) {
                let palette = this.getColorPaletteByName(tokens[0]);
                let index = tokens[1] ? tokens[1] : '500';

                returnVal = palette[index] ? palette[index] : undefined;
            }
        }

        return returnVal;
    },

    /**
     * Validates whether a string is a Hex number and returns a normalized Hex value if it is. 
     * @param {string} token A string representing what might be a hex value. 
     * @example '#299976'
     * @example '299976'
     * @example '#fff'
     * @example 'fff'
     * @returns {string} For a valid hex number, such as '#299976' or '299976, returns its normalized Hex color value. Returns undefined if the value cannot be determined. 
     */
    getHexFromHex: function (token) {
        if (token) {
            //Let's see if it's a valid hex value. 
            //Remove the hash mark if it has one
            let h = token.trim().toLowerCase().replace("#", '');

            var isHex = false;

            //Valid hex values can be 6 or 3 letters long. 
            //This doesn't work with alpha values. 
            if (h.length === 6 || h.length === 3) {
                isHex = typeof h === 'string'
                    && !isNaN(Number('0x' + h))
            }

            //If it's a hex, let's add a # back in and return it.
            if (isHex) {
                return "#" + h;
            }
        }

        return undefined;
    },

};
