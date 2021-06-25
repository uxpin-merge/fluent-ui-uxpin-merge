import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Dropdown as FDropdown } from '@fluentui/react/lib/Dropdown';
import { csv2arr } from '../_helpers/parser';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import * as UXPinParser from '../_helpers/UXPinParser';


const defaultItems = `Apples
Bananas
"I love you, Grapes!"
Pears`;



class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //0 based. default must be undefined
      _selectedIndex: undefined,

      //0 based. default must be an empty array
      _selectedIndices: [],
    }
  }

  set() {
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

  //The main entry point for the control's onChange event. 
  // Note that 'changed' means its changed from checked to unchecked, or vice versa. 
  // And in the case of multi-select, each individual item comes in separately. 
  _onChoiceChange(option, index) {
    //Case Single Select
    // Option info is undefined. The Index is the index of the newly selected item. 

    //Case Multi Select
    // Option info has the new selection state info for a specific item. 
    // Option.selected has its new selection state, true or false. Index is its index. 

    if (this.props.multiSelect) {
      this._onChangeMulti(option);
    }
    else {
      this._onChangeSingle(index);
    }
  }

  // To process the onChange event for a single select use case. 
  _onChangeSingle(index) {

    // We MUST set the state with the updated index value. This will also force the control to update in UXPin at runtime.
    this.setState(
      { _selectedIndex: index }
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

    //Clone the array.
    var keys = [...this.state._selectedIndices];
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
      { _selectedIndices: keys }
    )

    //Raise this event to UXPin. 
    if (this.props.onControlChange) {
      const list = keys.sort().map(key => key + 1).toString(); //comma separated
      this.props.onControlChange(list);
    }
  }

  render() {

    //We set both props in the Return.
    // One of these must be set to undefined, depending on whether this is single or multi select.
    var sIndex = undefined;
    var mIndices = undefined;

    if (this.props.multiSelect) {
      mIndices = this.state._selectedIndices;
    }
    else {
      sIndex = this.state._selectedIndex;
    }

    let items = UXPinParser.parse(this.props.items).map(
      (item, index) => ({
        text: item.text,
        key: index,
      })
    );

    return (

      <FDropdown
        {...this.props}
        options={items}
        selectedKey={sIndex}
        selectedKeys={mIndices}
        onChange={(e, o, i) => { this._onChoiceChange(o, i); }}
      />

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
};


export { Dropdown as default };
