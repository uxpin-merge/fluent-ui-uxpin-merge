import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon as IconM } from '@fluentui/react/lib/Icon';
import { UxpColors } from '../_helpers/uxpcolorutils';



const defaultColor = '#000000';



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
  iconName: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  iconName: "Home",
  size: 50,
  color: "grey-700"
};

export { Icon as default }
