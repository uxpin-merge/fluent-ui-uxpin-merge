import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CommandButton as FCommandButton } from '@fluentui/react/lib/Button';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import * as UXPinParser from '../_helpers/UXPinParser';



const defaultIcon = "Add";
const defaultText = "Command Button";
const defaultItems = `icon(Document) Add Document
icon(FileCode) Add Code File
divider
icon(Picture) Add Picture`;

const childTag = "*";
const dividerText1 = "divider";
const dividerText2 = "----";
const itemTypeHeader = ContextualMenuItemType.Header;
const itemTypeDivider = ContextualMenuItemType.Divider;



class CommandButton extends React.Component {

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
    if (prevProps.items !== this.props.items) {
      this.set();
    }
  }

  set() {
    this.setState({
      items: this._parseMenuItems()
    });
  }

  _parseMenuItems() {
    var itemList = [];

    if (this.props.items) {
      let hasHeadersAndChildren = this._testForHeaders();

      if (hasHeadersAndChildren) {
        let items = this.props.items.match(/[^\r\n]+/g);

        if (items && items.length) {
          var i;
          for (i = 0; i < items.length; i++) {
            var item = items[i]?.trim();
            let isChild = item?.startsWith(childTag);

            if (isChild) {
              //We must remove the * before parsing.
              item = item.substring(1).trim();
            }

            let parsedMenuItems = UXPinParser.parse(item);
            if (parsedMenuItems && parsedMenuItems.length > 0) {
              let menuItem = parsedMenuItems[0];
              let trimmedText = menuItem.text?.trim();
              if (menuItem && trimmedText) {
                let props = this._getMenuProps(i, trimmedText, menuItem?.iconName, isChild);
                props ? itemList.push(props) : '';
              }
            }
          }
        }
      }
      else {
        itemList = UXPinParser.parse(this.props.items?.trim()).map(
          (item, index) => (
            this._getMenuProps(index, item?.text?.trim(), item?.iconName, true)
          )
        );
      }

      return itemList;
    }
  }

  //If one item starts with the child tag, then we'll need to parse using the Headers + Items strategy
  _testForHeaders() {
    if (this.props.items) {
      let items = this.props.items.match(/[^\r\n]+/g);

      if (items && items.length) {
        var i;
        for (i = 0; i < items.length; i++) {
          let item = items[i]?.trim();
          if (item?.startsWith(childTag)) {
            return true;
          }
        }
      }
    }

    //Else if we made it this far, there are no headers/children pattern
    return false;
  }

  _getMenuProps(index, text, iconName, isChild) {
    let key = index + 1;
    let isDivider = (text?.toLowerCase() === dividerText1) || text?.startsWith(dividerText2);

    if (text && isDivider) {
      let menuProps = {
        key: "divider_" + key,
        itemType: itemTypeDivider,
      };
      return menuProps;
    }
    else {
      let itemKey = isChild ? key : 'header_' + key;
      let itemType = isChild ? '' : itemTypeHeader;

      let menuProps = {
        key: itemKey,
        text: text ? text : '',
        itemType: itemType,
        iconProps: {
          iconName: iconName ? iconName : ''
        },
        onClick: () => { this._onClick(itemKey) },
      };
      return menuProps;
    }
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

    let iconProps = { iconName: this.props.iconName }

    const buttonID = _.uniqueId('commandbutton_');
    const tooltipID = _.uniqueId('tooltip_');
    const ttProps = {
      gapSpace: 0,
      target: `#${buttonID}`,
    };

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

    var menuProps = undefined;
    if (this.props.items) {
      menuProps = {
        items: this.state.items,
        directionalHintFixed: true,
      };
    }

    let menuIconProps = {
      iconName: 'MoreVertical',
    }

    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipID}
          calloutProps={ttProps}
        >
          <FCommandButton
            {...this.props}
            id={buttonID}
            aria-describedby={tooltipID}
            text={this.props.text}
            iconProps={iconProps}
            menuProps={menuProps}
            menuIconProps={this.props.ellipsis ? menuIconProps : ''}
            styles={styles}
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
CommandButton.propTypes = {

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
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

  /**
   * @uxpindescription An optional list of popup menu items. Put each item on a separate line. Optionally add an icon. Supported syntax:  icon(IconName) Item Text. Use 'divider' to add a divider. To activate headers with children, put a * in front of any child, such as: * icon(IconName) Item Text.
   * @uxpinpropname Menu Items
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
   * @uxpindescription To show the sub-menu icon as an ellipsis
   * @uxpinpropname Ellipsis Icon
   * */
  ellipsis: PropTypes.bool,

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
  onButtonClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
CommandButton.defaultProps = {
  disabled: false,
  tooltip: '',
  text: defaultText,
  iconName: defaultIcon,
  items: defaultItems,
  ellipsis: false,
  index: 0,
};


export { CommandButton as default };
