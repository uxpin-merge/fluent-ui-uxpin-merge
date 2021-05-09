import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SwatchColorPicker as FSwatchColorPicker } from '@fluentui/react/lib/SwatchColorPicker';
import { UxpColors } from '../_helpers/uxpcolorutils';



const cellMinSize = 10;
const cellMaxSize = 100;
const cellCountMax = 300;

const shapeCircle = 'circle';
const shapeSquare = 'square';

const colorCellsExample1 = [
    { id: '1', label: 'red', color: '#a4262c' },
    { id: '2', label: 'orange', color: '#ca5010' },
    { id: '3', label: 'orangeYellow', color: '#986f0b' },
    { id: '4', label: 'yellowGreen', color: '#8cbd18' },
    { id: '5', label: 'green', color: '#0b6a0b' },
    { id: '6', label: 'cyan', color: '#038387' },
    { id: '7', label: 'cyanBlue', color: '#004e8c' },
    { id: '8', label: 'magenta', color: '#881798' },
    { id: '9', label: 'magentaPink', color: '#9b0062' },
    { id: '10', label: 'black', color: '#000000' },
    { id: '11', label: 'gray', color: '#7a7574' },
    { id: '12', label: 'gray20', color: '#69797e' },
];

const paletteBlues = "Blues";
const paletteGreys = "Greys";
const paletteAccents = "Accents";
const paletteCustom = "Custom Color List";



class SwatchColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cellSize: 20,
            selectedColorID: null, //Must be null for default
            selectedColor: null,   //Must be null for default
            colors: []
        }
    }

    set() {
        console.log("set for palette: " + this.props.palette);
        let palette = this.props.palette;

        //Populate the color array.
        let colors = palette === paletteBlues ? UxpColors.getBlueColorList()
            : palette === paletteGreys ? UxpColors.getGreyColorList()
                : palette === paletteAccents ? UxpColors.getAccentColorList()
                    : colorCellsExample1;

        //Normalize the size coming in from props.
        let size = this.props.cellSize < cellMinSize ? cellMinSize
            : this.props.cellSize > cellMaxSize ? cellMaxSize
                : this.props.cellSize;

        this.setState(
            {
                colors: colors,
                cellSize: size,
            }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.colors !== this.props.colors ||
            prevProps.cellSize !== this.props.cellSize) {
            this.set();
        }
    }

    _getSelectedColorIndex() {
        //By default, if it's an empty string, the Microsoft control won't show anything as selected
        var selectedColorIndex = "";

        //Since the default value is null, we know that if there's a value here, it's been set by the end user
        if (this.state.selectedColorID) {
            selectedColorID = this.state.selectedColorID;
        }
        else if (this.props.selectedColor) {
            let index = this.props.selectedIndex;
            if (index > 0 &&
                index < cellCountMax) {
                selectedColorIndex = index - 1; //State uses a 0 based index
            }
        }

        return selectedColorIndex;
    }


    _onColorChanged(id, color) {
        console.log("Color selected. ID: " + id);
        console.log("    Color: " + color);

        this.setState(
            {
                selectedColorID: id,
                selectedColor: color
            }
        )

        //Return the index of the color so UXPin can catch it
        if (this.props.onChange) {
            this.props.onChange(id);
        }
    }


    render() {

        let selectedColorIndex = this._getSelectedColorIndex();

        let cellSize = this.state.cellSize;
        let palette = this.state.colors;

        console.log("render. selected color ID: " + selectedColorID);
        console.log("      cell size: " + cellSize);

        return (

            <FSwatchColorPicker
                {...this.props}
                // isControlled={true}
                colorCells={palette}
                // selectedID={selectedColorID}
                cellShape={this.props.shape}
                cellWidth={cellSize}
                cellHeight={cellSize}
                columnCount={this.state.columns}
                // disabled={this.disabled}
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
    padding: PropTypes.number,

    /**
     * @uxpindescription Select one of the PayPal UI color palettes, or enter a custom set of your own with the Custom Colors property
     * @uxpinpropname Palette
     */
    palette: PropTypes.oneOf([
        paletteBlues,
        paletteGreys,
        paletteAccents,
        paletteCustom]),

    /**
     * @uxpindescription Enter one color per line using this pattern: Color Name, Hex Value. Note the comma! Example: Eggshell Blue, #0070BA
     * @uxpinpropname Custom Colors
     */
    colors: PropTypes.string,

    /**
     * @uxpindescription The 1-based index for the selected color. Leave blank or enter -1 for no selection.
     * @uxpinpropname * Index
     */
    selectedIndex: PropTypes.number,

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
    shape: shapeCircle,
    cellSize: 24,
    padding: 10,
    columns: 5,
    palette: paletteBlues,
    disabled: false,
};


export { SwatchColorPicker as default };
