import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import * as UXPinParser from '../_helpers/UXPinParser';



const defaultText = 'SplitButton';
const defaultIcon = '';

//Default items list to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultItems = `icon(PageAdd) Add Document
icon(Photo2Add) Add Picture
icon(AddFriend) Add User`;



class SplitButton extends React.Component {

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

  //Parse the choice items
  set() {

    // let items = UXPinParser.parse(this.props.items).map(
    //   (item, index) => ({
    //     key: index + 1,
    //     text: item.text ? item.text : '',
    //     iconProps: { iconName: item?.iconName },
    //     disabled: false,
    //     onClick: () => { this._onClick(index + 1) },
    //   })
    // );

    let items = UXPinParser.parse(this.props.items).map(
      (item, index) => (
        this._getMenuProps(index, item?.text, item?.iconName)
      )
    );

    this.setState({
      items: items
    });
  }

  _getMenuProps(index, text, iconName) {
    let key = index + 1;

    if (text && text?.trim().toLowerCase() === "divider") {
      let menuProps = {
        key: "divider_" + key,
        itemType: ContextualMenuItemType.Divider,
      };
      return menuProps;
    }
    else {
      let menuProps = {
        key: key,
        text: text ? text : '',
        iconProps: {
          iconName: iconName ? iconName : ''
        },
        onClick: () => { this._onClick(key) },
      };
      return menuProps;
    }
  }

  _onClick(index) {

    //The main Button always passes 0.
    //Any sub-menu buttons pass their 1-based index value.

    //Raise this event to UXPin.
    if (this.props.onButtonClick) {
      this.props.onButtonClick(index);
    }
  }

  render() {

    const targetID = _.uniqueId('target_');
    const tooltipID = _.uniqueId('tooltip_');
    const ttProps = {
      gapSpace: 2,
      target: `#${targetID}`,
    };

    let iconProps = { iconName: this.props.iconName }

    var menuProps = undefined;
    if (this.state.items?.length) {
      menuProps = {
        items: this.state.items,
        directionalHintFixed: true
      };
    }

    let btnStyles = {
      root: {
        //Fixes the 'nudge up/down' issue
        display: 'block',
        lineHeight: 'normal',
      }
    }

    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipID}
          calloutProps={ttProps}
        >
          <DefaultButton
            {...this.props}
            id={targetID}
            iconProps={iconProps}
            aria-describedby={tooltipID}
            split={true}
            primary={this.props.primary}
            iconProps={iconProps}
            menuProps={menuProps}
            styles={btnStyles}
            //Always send 0 for the main button part
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
SplitButton.propTypes = {

  /**
   * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
  primary: PropTypes.bool,

  /**
  * @uxpindescription The displayed text on the button
  * @uxpinpropname Text
  * */
  text: PropTypes.string,

  /**
   * @uxpindescription The exact name from the Fluent icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription An optional list of popup menu items. Put each item on a separate line. Optionally add an icon. Supported syntax:  icon(IconName) Item Text. Use 'divider' to add a divider. 
   * @uxpinpropname Menu Items
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

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
 * @uxpindescription Fires when the button is clicked on.
 * @uxpinpropname * Click
 * */
  onButtonClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
SplitButton.defaultProps = {
  primary: true,
  disabled: false,
  iconName: defaultIcon,
  text: defaultText,
  items: defaultItems,
  tooltip: '',
};


export { SplitButton as default };
