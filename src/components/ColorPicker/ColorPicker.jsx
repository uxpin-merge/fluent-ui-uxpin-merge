import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ColorPicker as FColorPicker } from '@fluentui/react/lib/ColorPicker';
import { UxpColors } from '../_helpers/uxpcolorutils';



class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedColorObj: '',
        }
    }

    set() {

        console.log("set. props: " + this.props.selectedColor);

        //Let's see if the UXPin designer entered a default color value...
        let color = UxpColors.getHexFromHexOrToken(this.props.selectedColor);

        if (color) {
            this.setState(
                { selectedColorObj: color }
            )
        }
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedColor !== this.props.selectedColor) {
            this.set();
        }
    }

    _onChanged(color) {

        console.log("on change. color: " + color + " - Hex: " + color.hex);

        this.setState(
            { selectedColorObj: color }
        )

        //Get the hex for the selected color and surface that
        let hex = "#" + color.hex;

        //Return the index of the color
        if (this.props.onColorChange) {
            this.props.onColorChange(hex);
        }
    }


    render() {

        return (

            <FColorPicker
                {...this.props}
                showPreview={true}
                color={this.state.selectedColorObj}
                alphaSliderHidden={!this.props.showAlpha}
                onChange={(evt, c) => this._onChanged(c)}
            />

        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ColorPicker.propTypes = {

    /**
     * @uxpindescription A PayPal UI or Hex color value to provide as the default color, such as: 'blue-600' or '#0070BA' (Optional). This prop's live value is available for scripting.
     * @uxpinpropname * Color
     * @uxpinbind onColorChange
     */
    selectedColor: PropTypes.string,

    /**
     * @uxpindescription To show the Alpha transparency features
     * @uxpinpropname Show Alpha
     * */
    showAlpha: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control's Color value changes.
     * @uxpinpropname * Color Changed
     */
    onColorChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ColorPicker.defaultProps = {
    selectedColor: "",
    showAlpha: true,
};


export { ColorPicker as default };
