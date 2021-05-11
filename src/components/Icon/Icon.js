import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon as IconM } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/merge-styles';
import { UxpColors } from '../_helpers/uxpcolorutils';

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

    const iconDisplayClass = mergeStyles({
      color: color,
      fontSize: size,
      height: size,
      width: size,
      display: 'block',
      lineHeight: 'normal',
    });

    return (

      <IconM
        {...this.props}
        iconName = { this.props.iconName.trim() }
        className = { iconDisplayClass }
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

export { Icon as default}
