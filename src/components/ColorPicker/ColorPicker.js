import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ColorPicker as FColorPicker } from '@fluentui/react/lib/ColorPicker';
import { UxpColors } from '../_helpers/uxpcolorutils';

const defaultColor = '#ffffff';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColorObj: '',
    };
  }

  set() {
    let color = UxpColors.getHexFromHexOrToken(this.props.selectedColor);

    if (color) {
      this.setState({ selectedColorObj: color });
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
    this.setState({ selectedColorObj: color });

    //Get the hex & optional transparency for the selected color and surface that
    let hex = '#' + color.hex;
    let trans = color.t ? color.t : '';

    //Return the index of the color
    if (this.props.onColorChange) {
      this.props.onColorChange(hex + trans);
    }
  }

  render() {
    return (
      <FColorPicker
        {...this.props}
        showPreview={true}
        color={this.state.selectedColorObj}
        alphaType={'transparency'}
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
   * @uxpindescription A Hex color value or color token to provide as the default color, such as: 'themePrimary' or '#0070BA'. This prop's live value is available for scripting.
   * @uxpinpropname * Color
   * @uxpinbind onColorChange
   */
  selectedColor: PropTypes.string,

  /**
   * @uxpindescription To show the transparency features
   * @uxpinpropname Show Transparency
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
  selectedColor: defaultColor,
  showAlpha: true,
};

export { ColorPicker as default };
