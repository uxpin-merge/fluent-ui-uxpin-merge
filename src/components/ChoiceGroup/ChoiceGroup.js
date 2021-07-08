import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ChoiceGroup as FChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import * as UXPinParser from '../_helpers/UXPinParser';


//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultChoices = `Apples
Bananas
"I love you, Grapes!"
Kiwis
Oranges`;


class ChoiceGroup extends React.Component {

  constructor(props) {
    super(props);

    //Track the selected index state within the control
    this.state = {
      _index: 1,
      items: []
    }
  }

  componentDidMount() {
    this.setItems();

    //Store the selected index as 1 based, same as user input
    this.setState(
      {
        _items: [],
        _index: 0,
      }
    )
  }

  set() {

    let items = UXPinParser.parse(this.props.items).map(
      (item, index) => ({
        key: index,
        text: item.text ? item.text : '',
        iconProps: this.props.tiled ? { iconName: item?.iconName } : '',
        disabled: this.props.disabled,
      }));

    this.setState({
      _items: items,
      _index: this.props.selectedIndex,
    });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items ||
      prevProps.tiled !== this.props.tiled ||
      prevProps.selectedIndex !== this.props.selectedIndex) {
      this.set();
    }
  }

  _onChoiceChange(option) {
    //Get the value. Add 1 because it's stored as a 1-based index to be more user friendly.
    const i = option.key + 1;

    //Set the state with the updated index value. 
    this.setState(
      { _index: i }
    )

    //Raise this event to UXPin. 
    if (this.props.onChange) {
      this.props.onChange(i);
    }
  }

  render() {

    //Subtract 1 because it's stored as a 1-based index to be more user friendly.
    const selectedKey = this.state._index - 1;

    return (

      <FChoiceGroup
        {...this.props}
        options={this.state._items}
        selectedKey={selectedKey}
        onChange={(e, o) => { this._onChoiceChange(o); }}
      />

    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ChoiceGroup.propTypes = {

  /**
   * @uxpindescription The label for the options
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
  * @uxpindescription The 1-based index value of the default item to be shown as selected (Optional). This prop's live value is available for scripting.
  * @uxpinbind onChange
  * @uxpinpropname * Index
   * */
  selectedIndex: PropTypes.number,

  /**
  * @uxpindescription The list of options. Put each option on a separate line. Enclose an item in quotes to include a comma within it.  For tiled choices, check the Tiled property and add an icon(IconName) at the start of each line.
  * @uxpinpropname Items
  * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
   * @uxpindescription To display the choices as icon tiles
   * @uxpinpropname Tiled
   * */
  tiled: PropTypes.bool,

  /**
   * @uxpindescription To display the 'required' flag on the label
   * @uxpinpropname Required
   * */
  required: PropTypes.bool,

  /**
   * @uxpindescription Whether to show the control as disabled
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the selected index value changes.
   * @uxpinpropname * Index Changed
   * */
  onChange: PropTypes.func
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
ChoiceGroup.defaultProps = {
  label: 'Basic ChoiceGroup',
  items: defaultChoices,
  selectedIndex: 0,
  required: false,
  tiled: false
};


export { ChoiceGroup as default };
