import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CompoundButton as FCompoundButton } from '@fluentui/react/lib/Button';



const posStart = 'start';
const posEnd = 'end';



class CompoundButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {

    let styles = {
      label: {
        textAlign: this.props.align
      },
      description: {
        textAlign: this.props.align
      }
    }

    let iconProps = { iconName: this.props.iconName }

    if (this.props.iconPosition === posEnd) styles.flexContainer = {
      flexDirection: 'row-reverse'
    }

    return (
      <FCompoundButton
        {...this.props}
        iconProps={iconProps}
        primary={this.props.primary}
        text={this.props.text}
        secondaryText={this.props.secondaryText}
        disabled={this.props.disabled}
        styles={styles}
      // onClick={() => { this._onClick(); }}
      />
    )
  }
}

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CompoundButton.propTypes = {

  /**
   * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
  primary: PropTypes.bool,

  /**
   * @uxpindescription The exact name from the icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription The location to display an icon, if one is set
   * @uxpinpropname Icon Position
   * */
  iconPosition: PropTypes.oneOf([posStart, posEnd]),

  /**
   * @uxpindescription The larger primary displayed on the button
   * @uxpinpropname Text
   * */
  text: PropTypes.string,

  /**
   * @uxpindescription The smaller secondary displayed on the button
   * @uxpinpropname Secondary Text
   * */
  secondaryText: PropTypes.string,

  /**
   * @uxpindescription Text alignment
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the button is clicked on.
   * @uxpinpropname Click
   * */
  onClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
CompoundButton.defaultProps = {
  primary: true,
  disabled: false,
  text: "Compound Button Text",
  secondaryText: "Secondary text",
  align: 'left',
  iconName: "",
  iconPosition: posStart,
};


export { CompoundButton as default };
