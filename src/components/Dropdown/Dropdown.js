import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Dropdown as FDropdown } from '@fluentui/react/lib/Dropdown';
import { SelectableOptionMenuItemType } from '@fluentui/react/';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import * as UXPinParser from '../_helpers/UXPinParser';


const defaultItems = `Apples
Bananas
"I love you, Grapes!"
Pears`;

const childTag = "*";
const itemTypeHeader = SelectableOptionMenuItemType.Header;
const itemTypeDivider = SelectableOptionMenuItemType.Divider;



class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //0 based. default must be undefined
      _selectedIndex: undefined,

      //0 based. default must be an empty array
      _selectedIndices: [],

      items: [],
      isDirty: false,
    }
  }

  set() {
    //Figure out the items
    let hasHeadersAndChildren = this._testForHeaders();

    let items = UXPinParser.parse(this.props.items).map(
      (item, index) => (
        this._getItemProps(index, item?.text, hasHeadersAndChildren)
      )
    );

    //Figure out the selected indexes
    var index = undefined;
    var list = [];

    //Props are 1 based. Subtract 1 from whatever the user entered.
    let selected = UxpNumberParser.parseIntsAdjusted(this.props.selected, -1);

    if (selected && selected.length > 0) {
      index = selected[0];
      list = selected;
    }

    this.setState({
      _selectedIndex: index,
      _selectedIndices: list,
      items: items,
    })
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.set();
    }
  }

  //If one item starts with the child tag, then we'll need to parse using the Headers + Items strategy
  _testForHeaders() {
    if (this.props.items) {
      let items = this.props.items.match(/[^\r\n]+/g);

      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          let item = items[i]?.trim();
          if (item.startsWith(childTag)) {
            return true;
          }
        }
      }
    }

    //Else if we made it this far, there are no headers/children pattern
    return false;
  }

  _getItemProps(index, text, hasHeadersAndChildren) {
    let key = index;

    if (text && text?.trim().toLowerCase() === "divider") {
      let itemProps = {
        key: "divider_" + key,
        itemType: itemTypeDivider,
      };
      return itemProps;
    }
    else {
      let isChild = hasHeadersAndChildren && text.startsWith(childTag);

      let itemKey = hasHeadersAndChildren && !isChild ? 'header_' + key : key;
      let itemType = hasHeadersAndChildren && !isChild ? itemTypeHeader : '';

      let itemText = hasHeadersAndChildren && isChild ?
        text.substring(text.indexOf(childTag) + 1) : text;

      let itemProps = {
        key: itemKey,
        text: itemText,
        itemType: itemType,
        disabled: false,
      };
      return itemProps;
    }
  }

  //The main entry point for the control's onChange event. 
  // Note that 'changed' means its changed from checked to unchecked, or vice versa. 
  // And in the case of multi-select, each individual item comes in separately. 
  _onChoiceChange(option, index) {

    if (this.props.multiSelect) {
      //Case Multi Select
      // Option info has the new selection state info for a specific item. 
      // Option.selected has its new selection state, true or false. Index is its index. 
      this._onChangeMulti(option);
    }
    else {
      //Case Single Select
      // Option info is undefined. The Index is the index of the newly selected item. 
      this._onChangeSingle(index);
    }
  }

  // To process the onChange event for a single select use case. 
  _onChangeSingle(index) {

    // We MUST set the state with the updated index value. This will also force the control to update in UXPin at runtime.
    this.setState(
      {
        _selectedIndex: index,
        isDirty: false,
      }
    )


    // Raise this event to UXPin. 
    if (this.props.onControlChange) {
      this.props.onControlChange((index + 1).toString());
    }
  }

  //To process the onChange event for a multi-select use case. 
  _onChangeMulti(option) {

    let selected = option.selected;
    let key = option.key;

    //Remove indexes that refer to a divider or header
    let items = this.state.items;
    var keys = this.state._selectedIndices.filter(
      function (currVal) {
        return items[currVal] && (items[currVal]?.itemType !== itemTypeHeader || itemTypeDivider)
      });
    let included = keys.includes(key);

    //If selected, let's add it to our tracking array prop.
    if (selected && included == false) {
      keys.push(key);
    }
    else if (selected == false && included) {

      //Otherwise let's remove it from our tracking array. 
      var filtered = keys.filter(
        function (currVal) {
          return currVal != key;
        });

      // Now we set the filtered array to the keys array.
      keys = filtered;
    }

    this.setState(
      {
        _selectedIndices: keys,
        isDirty: true,
      }
    )
  }

  //If it's multiselect, only notify UXPin of changes on blur.
  _onBlur() {
    if (this.state.isDirty && this.props.multiSelect) {
      //Raise this event to UXPin. 
      if (this.props.onControlChange) {
        let list = this.state._selectedIndices.sort().map(key => key + 1).toString();
        this.props.onControlChange(list);
      }

      this.setState(
        { isDirty: false }
      )
    }
  }

  render() {

    //We muse set both props.
    // One of these must be set to undefined, depending on whether this is single or multi select.
    let sIndex = this.props.multiSelect ? undefined
      : this.state._selectedIndex;
    let mIndices = this.props.multiSelect ? this.state._selectedIndices
      : undefined;

    const ttTargetID = _.uniqueId('ttTarget_');
    const tooltipID = _.uniqueId('tooltip_');
    const ttProps = {
      gapSpace: 4,
      target: `#${ttTargetID}`,
    };

    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipID}
          calloutProps={ttProps}
        >
          <FDropdown
            {...this.props}
            options={this.state.items}
            selectedKey={sIndex}
            selectedKeys={mIndices}
            id={ttTargetID}
            aria-describedby={tooltipID}
            onChange={(e, o, i) => { this._onChoiceChange(o, i); }}
            onBlur={() => this._onBlur()}
          />

        </TooltipHost>
      </div>
    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Dropdown.propTypes = {

  /**
   * @uxpindescription The label for the control
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show until an item(s) is selected
   * @uxpinpropname Placeholder
   * */
  placeholder: PropTypes.string,

  /**
   * @uxpindescription The selected indexes, separated with commas (1-based index). In case of Single Select mode, the first number will be used if multiple values are provided. This prop's live value is available for scripting.
   * @uxpinbind onControlChange
   * @uxpinpropname * Indexes
   * */
  selected: PropTypes.string,

  /**
   * @uxpindescription The list of available options. Separate items with a comma. 
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
   * @uxpindescription To allow multiple selections
   * @uxpinpropname Multi-select
   * */
  multiSelect: PropTypes.bool,

  /**
   * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
   * @uxpinpropname Error Message
   * */
  errorMessage: PropTypes.string,

  /**
   * @uxpindescription To display the 'required' flag on the label
   * @uxpinpropname Required
   * */
  required: PropTypes.bool,

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
   * @uxpindescription Fires when the selected index(es) changes.
   * @uxpinpropname * Indexes Changed
   * */
  onControlChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Dropdown.defaultProps = {
  label: "Basic Dropdown",
  items: defaultItems,
  selected: '',
  placeholder: "- Select -",
  disabled: false,
  required: false,
  tooltip: '',
};


export { Dropdown as default };
