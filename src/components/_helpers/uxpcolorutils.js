import { DefaultPalette, CommunicationColors, NeutralColors, SharedColors } from '@fluentui/react/lib/Theme';



export const UxpColors = {

    // //******  Greys  ******  
    black: '#000000',
    white: '#ffffff',

    //******  Semantic Colors  ****** 
    // A few key semantic colors
    info: '#0078d4',                //MS themePrimary
    infoText: '#000000',           //Black,
    infoBackground: '#eff6fc',      //MS themeLighterAlt
    infoBackgroundHover: '#deecf9',      //MS themeLighter

    success: '#107c10',             //MS green
    successText: '#000000',           //White
    successBackground: '#dff6dd',   //MS Messaging success
    successBackgroundHover: '#8cbd18',   //MS yellowGreen10

    warning: '#ea4300',             //MS orangeLight
    warningText: '#000000',           //Black
    warningBackground: '#fed9cc',   //MS severe warning
    warningBackgroundHover: '#ffaa44',   //MS orange10

    error: '#d13438',               //MS red
    errorText: '#000000',           //Black,
    errorBackground: '#fde7e9',     //MS error block
    errorBackgroundHover: '#d13438',     //MS red10


    /**
     * This is the main entry point for all supported color parsing, whether for Microsoft Fluent tokens or hex values. Use this method if the input string is unknown, and could either be a Hex value (with or without the #) or a color token, such as 'blue-700'. Includes support for Microsoft Fluent tokents. 
     * @example 'grey-500'
     * @example 'blue-300'
     * @example '#ffffff'
     * @example 'ffffff'
     * @example '#fff'
     * @example 'themePrimary'
     * @example 'neutralSecondary'
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

            //Let's see if it's one of the other tokens.
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
        let fToken = this.getHexFromFluentToken(token);
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

    /**
     * Use this method if the input string is expected to be a Microsoft Fluent color token, such as 'themePrimary', 'neutralSecondary', 'orangeLight', or 'gray80'.
     * @example 'themePrimary'
     * @example 'neutralSecondary'
     * @example 'orangeLight'
     * @example 'gray80'
     * @param {string} colorStr Either a Hex color value (with or without a #), or a  color token, such as 'blue-700'.
     * @returns {string} For a valid hex color value or a  color token name, such as 'blue-700', returns its Hex color value. 
     * For a gradient value, such as linear-gradient(#553749, #EE77), string will be returned as-is.
     */
    getHexFromFluentToken: function (token) {

        if (token) {
            let t = token.trim();

            //Let's cycle thru the palettes from MS
            var color = this.getHexFromFluentDefaultPalette(t);
            if (color)
                return color;

            color = this.getHexFromFluentSharedColors(t);
            if (color)
                return color;

            color = this.getHexFromFluentNeutralColors(t);
            if (color)
                return color;

            color = this.getHexFromFluentCommunicationColors(t);
            if (color)
                return color;
        }

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