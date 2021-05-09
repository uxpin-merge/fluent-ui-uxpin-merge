import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SwatchColorPicker as FSwatchColorPicker } from '@fluentui/react/lib/SwatchColorPicker';
import { UxpColors } from '../_helpers/uxpcolorutils';
import uxpinConfig from '../../../uxpin.config';



const shapeCircle = 'circle';
const shapeSquare = 'square';

const sampleColorList = [
    { id: 'a', label: 'red', color: '#a4262c' },
    { id: 'b', label: 'orange', color: '#ca5010' },
    { id: 'c', label: 'orangeYellow', color: '#986f0b' },
    { id: 'd', label: 'yellowGreen', color: '#8cbd18' },
    { id: 'e', label: 'green', color: '#0b6a0b' },
    { id: 'f', label: 'cyan', color: '#038387' },
    { id: 'g', label: 'cyanBlue', color: '#004e8c' },
    { id: 'h', label: 'magenta', color: '#881798' },
    { id: 'i', label: 'magentaPink', color: '#9b0062' },
    { id: 'j', label: 'black', color: '#000000' },
    { id: 'k', label: 'gray', color: '#7a7574' },
    { id: 'l', label: 'gray20', color: '#69797e' },
];

const paletteBlues = "Blues";
const paletteGreys = "Greys";
const paletteAccents = "Accents";
const paletteCustom = "Custom Color List";



class SwatchColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _colorPalette: [],
        }
    }

    set() {
        let pref = this.props.palette;
        let palette = pref === paletteBlues ? UxpColors.getBlueColorList()
            : pref === paletteGreys ? UxpColors.getGreyColorList()
                : pref === paletteAccents ? UxpColors.getAccentColorList()
                    : sampleColorList;

        //Reset the IDs so we can use the selected index prop.
        if (palette) {
            var i;
            for (i = 0; i < palette.length; i++) {
                let color = palette[i];
                color.id = i + 1;
            }
        }

        this.setState({
            _colorPalette: palette,
        });
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.palette !== this.props.palette) {
            this.set();
        }
    }

    _onColorChanged(id, color) {
        console.log("Color selected. ID: " + id);
        console.log("    Color: " + color);

        //Return the index of the color 
        if (this.props.onChange) {
            this.props.onChange(id);
        }
    }

    render() {
        console.log("Entering render...");
        let palette = this.state._colorPalette;

        return (

            <FSwatchColorPicker
                {...this.props}
                colorCells={palette}
                cellShape={this.props.shape}
                cellWidth={this.props.cellSize}
                cellHeight={this.props.cellSize}
                columnCount={this.props.columns}
                onColorChanged={(id, c) => this._onColorChanged(id, c)}
            />

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
SwatchColorPicker.propTypes = {

    /**
     * @uxpindescription In the designer, set a 1-based index for the selected color. Leave blank or enter -1 for no selection. In a running prototype, this prop returns a color hex value. 
     * @uxpinbind onChange
     * @uxpinpropname * Selected Index
     */
    selectedIndex: PropTypes.number,

    /**
     * @uxpindescription Select one of the color palettes, or enter a custom set of your own with the Custom Colors property
     * @uxpinpropname Palette
     */
    palette: PropTypes.oneOf([
        paletteBlues,
        paletteGreys,
        paletteAccents,
        paletteCustom]),

    /**
     * @uxpindescription Enter one color per line using this pattern: Color Name | Hex Value. Note the pipe! Example: Eggshell Blue | #0070BA
     * @uxpinpropname Custom Colors
     * @uxpincontroltype codeeditor
     */
    customColors: PropTypes.string,

    /**
     * @uxpindescription Whether the cells should be circular or square
     * @uxpinpropname Cell Shape
     */
    shape: PropTypes.oneOf([shapeCircle, shapeSquare]),

    /**
     * @uxpindescription The size to use for the width and height. Valid values are between 10 - 100.
     */
    cellSize: PropTypes.number,

    /**
     * @uxpindescription The number of swatches to display in each row
     */
    columns: PropTypes.number,

    /**
     * @uxpindescription The padding to use between each color swatch
     */
    cellMargin: PropTypes.number,

    /**
     * @uxpindescription To disable the control
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the a color is selected.
     * @uxpinpropname * Color Changed
     */
    onChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
SwatchColorPicker.defaultProps = {
    selectedIndex: 1,
    shape: shapeCircle,
    cellSize: 24,
    cellMargin: 10,
    columns: 5,
    palette: paletteBlues,
    customColors: '',
    disabled: false,
};


export { SwatchColorPicker as default };
