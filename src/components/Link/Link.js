import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link as FLink } from '@fluentui/react/lib/Link';
import { Text } from '@fluentui/react/lib/Text';
import * as UXPinParser from '../_helpers/UXPinParser';

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theHref: '',
    };
  }

  set() {
    let href = UXPinParser.normalizeLink(this.props.linkHref);

    this.setState({
      theHref: href,
    });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.set();
    }
  }

  _onLinkClick() {
    if (this.props.disabled) return;

    //Raise this event to UXPin. We'll send them the HREF value in case they can catch it.
    if (this.props.onLinkClick) {
      this.props.onLinkClick(this.state.theHref);
    }
  }

  render() {
    let linkTarget = '_UXPin Mockup';
    if (this.state.theHref && this.state.theHref.includes('preview.uxpin.com')) {
      linkTarget = undefined;
    }

    let linkTextStyles = {
      root: {
        // color: "#000000",
        fontWeight: this.props.bold ? 'bold' : 'normal',
        fontStyle: this.props.italic ? 'italic' : 'normal',
        display: 'block', //Required - prevents a bug
        lineHeight: 'normal', //Required - prevents a bug,
        textAlign: this.props.align,
      },
    };

    return (
      <Text {...this.props} styles={linkTextStyles} variant={this.props.size}>
        <FLink
          href={this.state.theHref}
          styles={linkTextStyles}
          target={linkTarget} //Force open in a new window
          onClick={() => {
            this._onLinkClick();
          }}
        >
          {this.props.value}
        </FLink>
      </Text>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Link.propTypes = {
  /**
   * @uxpindescription The text value to display
   * @uxpinpropname Link Text
   * @uxpincontroltype textfield(6)
   */
  value: PropTypes.string,

  /**
   * @uxpindescription A valid href value for the link itself. It should start with "http://", "https://", or "mailto:"
   * @uxpinpropname href
   * @uxpincontroltype textfield(6)
   */
  linkHref: PropTypes.string,

  /**
   * @uxpindescription To apply bold formatting
   * @uxpinpropname Bold
   */
  bold: PropTypes.bool,

  /**
   * @uxpindescription To apply italic formatting
   * @uxpinpropname Italic
   */
  italic: PropTypes.bool,

  /**
   * @uxpindescription Text alignment
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),

  /**
   * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
   * @uxpinpropname Size
   */
  size: PropTypes.oneOf([
    'tiny',
    'xSmall',
    'small',
    'smallPlus',
    'medium',
    'mediumPlus',
    'large',
    'xLarge',
    'xxLarge',
    'mega',
  ]),

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the control is clicked on
   * @uxpinpropname Click
   */
  onLinkClick: PropTypes.func,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Link.defaultProps = {
  value: 'UXPin.com',
  linkHref: '',
  size: 'medium',
  bold: false,
  italic: false,
  align: 'left',
  disabled: false,
};

export { Link as default };
