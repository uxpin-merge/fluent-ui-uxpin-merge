import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon as IconM } from '@fluentui/react/lib/Icon';
import { UxpColors } from '../_helpers/uxpcolorutils';



const defaultColor = '#000000';
const defaultIcon = 'Home';
const defaultSize = 50;



class Icon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {

    let size = this.props.size;

    let color = UxpColors.getHexFromHexOrToken(this.props.color);

    if (!color) {
      color = defaultColor;
    }

    const iconDisplayClass = {
      color: color,
      fontSize: size,
      height: size,
      width: size,
      display: 'block',
      lineHeight: 'normal',
    };

    return (

      <IconM
        {...this.props}
        iconName={this.props.iconName.trim()}
        className={iconDisplayClass}
      />

    );
  }
}

Icon.propTypes = {
  /**
   * @uxpindescription The exact name from the icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription The size to use for the icon's width and height
   * @uxpinpropname Icon Size
   * */
  size: PropTypes.number,

  /**
   * @uxpindescription Use a color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
   * @uxpinpropname Icon Color
   * */
  color: PropTypes.string,
};

Icon.defaultProps = {
  iconName: defaultIcon,
  size: defaultSize,
  color: defaultColor,
};

export { Icon as default }
