import React from 'react';
import * as PropTypes from 'prop-types';
import * as IconM from '@fluentui/react-icons-mdl2';
import { mergeStyles } from '@fluentui/merge-styles';
import { UxpColors } from '../_helpers/uxpcolorutils';

const AvailableIcons = {
  accept: IconM.AcceptIcon,
  clear: IconM.ClearIcon,
  contact: IconM.ContactIcon,
};

class Icon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {

    let color = UxpColors.getHexFromHexOrToken(this.props.color);
    if (!color) {
      color = defaultColor;
    }

    const iconDisplayClass = mergeStyles({
      color: color,
      fontSize: this.props.size,
      height: this.props.size,
      width: this.props.size,
      display: 'block',
      lineHeight: 'normal',
    });

    let SpecificIcon = AvailableIcons[this.props.iconName];
    return (
      <SpecificIcon
        {...this.props}
        className = { iconDisplayClass }
      />
    );
  }
}

Icon.propTypes = {
  iconName: PropTypes.oneOf([
    'accept',
    'clear',
    'contact'
  ]),
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
    iconName: "accept",
    size: 100,
    color: "grey-700"
};

export { Icon as default}
