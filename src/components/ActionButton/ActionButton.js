import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActionButton as FActionButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import * as UXPinParser from '../_helpers/UXPinParser';


const defaultIcon = "Add";
const defaultText = "Action Button";
const posStart = 'start';
const posEnd = 'end';


class ActionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }


  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.items !== this.props.items
    ) {
      this.set();
    }
  }

  set() {

    let items = UXPinParser.parse(this.props.items).map(
      (item, index) => ({
        key: index + 1,
        text: item.text ? item.text : '',
        iconProps: { iconName: item?.iconName },
        onClick: () => { this._onClick(index + 1) },
      })
    );

    this.setState({
      items: items
    });
  }

  _onClick(index) {

    //The main Button always passes 0.
    //Any popup menu buttons pass their 1-based index value.

    //Raise this event to UXPin.
    if (this.props.onButtonClick) {
      this.props.onButtonClick(index);
    }
  }

  render() {
    const buttonID = _.uniqueId('actionbutton_');

    let iconProps = { iconName: this.props.iconName }

    //We want the root's margin to help the control to equal 40px. We need to make up 14px when there is no text.
    var rootPadding = '0 7px';
    //The label margin is always present, even when there is no label
    var labelMargin = '0';
    if (this.props.text) {
      rootPadding = '0';
      labelMargin = '0 8px';
    }

    let styles = {
      root: {
        margin: 0,
        padding: rootPadding,
      },
      label: {
        whiteSpace: 'nowrap',
        margin: labelMargin,
        padding: 0,
      }
    }

    if (this.props.iconPosition === posEnd) styles.flexContainer = {
      flexDirection: 'row-reverse'
    }

    const tooltipId = _.uniqueId('tooltip_');
    const ttProps = {
      gapSpace: 0,
      target: `#${buttonID}`,
    };


    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipId}
          calloutProps={ttProps}
        >
          <FActionButton
            {...this.props}
            id={buttonID}
            iconProps={iconProps}
            styles={styles}
            aria-describedby={tooltipId}
            menuProps={this.state.items ? this.state.items : ''}
            onClick={() => { this._onClick(0) }}
          />
        </TooltipHost>
      </div>
    );
  }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ActionButton.propTypes = {

  /**
    * @uxpindescription The displayed text on the button (Optional)
    * @uxpinpropname Text
    * */
  text: PropTypes.string,

  /**
   * @uxpindescription The exact name from the PayPal icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription The location to display an icon, if one is set
   * @uxpinpropname Icon Position
   * */
  iconPosition: PropTypes.oneOf([posStart, posEnd]),

  /**
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

  /**
   * @uxpindescription An optional list of popup menu items. Put each item on a separate line. Optionally add an icon. Supported syntax:  icon(IconName) Item Text  
   * @uxpinpropname Menu Items
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
  * @uxpindescription To disable the control
  * @uxpinpropname Disabled
  * */
  disabled: PropTypes.bool,

  /**
  * @uxpindescription The index of the button or menu item that the user clicked on at runtime. 0 = the base button. 1 or more is one of the popup menu items. This prop's live value is available for scripting. (Used at runtime only.)
  * @uxpinpropname * Selected Index
  * @uxpinbind onButtonClick
  */
  index: PropTypes.number,

  /**
   * @uxpindescription Fires when the main button or a popup menu button is clicked on
   * @uxpinpropname Click
   * */
  onButtonClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ActionButton.defaultProps = {
  disabled: false,
  text: defaultText,
  iconName: defaultIcon,
  tooltip: '',
  items: '',
  index: 0,
  iconPosition: posStart,
};

export { ActionButton as default };
