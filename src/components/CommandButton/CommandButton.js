import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CommandButton as FCommandButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { UxpMenuUtils } from '../_helpers/uxpmenuutils';

const defaultIcon = 'Add';
const defaultText = 'Command Button';
const defaultItems = `Files
* icon(Document) Add Document
* icon(FileCode) Add Code File
divider
icon(Picture) Add Picture
icon(AddGroup) Add Group`;

class CommandButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      className: 'merge-component',
    };
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
    var menuItems = UxpMenuUtils.parseItemText(this.props.items, true);
    menuItems = this._addClickHandlers(menuItems);
    this.setState({
      items: menuItems,
    });
  }

  _addClickHandlers(menuProps) {
    if (menuProps) {
      var i;
      for (i = 0; i < menuProps.length; i++) {
        let item = menuProps[i];
        if (item) {
          //Dividers and Section Headers have item types
          if (!item.itemType) {
            item.onClick = () => this._onClick(item.key);
            item.className = 'merge-component';
          }
        }
      }
    }

    return menuProps;
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
    let iconProps = { iconName: this.props.iconName };

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
      },
    };

    var menuProps = undefined;
    if (this.props.items) {
      menuProps = {
        items: this.state.items,
        directionalHintFixed: true,
      };
    }

    let menuIconProps = {
      iconName: 'MoreVertical',
    };

    return (
      <div>
        <TooltipHost content={this.props.tooltip} id={tooltipID} calloutProps={ttProps}>
          <FCommandButton
            {...this.props}
            id={buttonID}
            aria-describedby={tooltipID}
            text={this.props.text}
            iconProps={iconProps}
            menuProps={menuProps}
            menuIconProps={this.props.ellipsis ? menuIconProps : ''}
            styles={styles}
            onClick={() => {
              this._onClick(0);
            }}
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
