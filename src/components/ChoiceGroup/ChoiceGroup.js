import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ChoiceGroup as FChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { getTokens, csv2arr } from '../_helpers/parser';
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
      { _index: this.props.selectedIndex }
    )
  }

  componentDidUpdate(prevProps) {

    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      //Store the selected index as 1 based, same as user input
      this.setState(
        { _index: this.props.selectedIndex }
      )
    }

    //If the user sets props to true, then we add icons, which automatically converts it to tiled display.
    //So if either condition is true, we need to reset the items list. 
    if (prevProps.items !== this.props.items || prevProps.tiled !== this.props.tiled) {
      this.setItems();
    }
  }

  //Get the user-entered left icon name, if there is one
  getLeftIcon(str) {
    if (this.props.tiled) {
      const tokens = getTokens(str).tokens;
      const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start');
      return leftIcon ? leftIcon.target : '';
    }
    else {
      return '';
    }
  }

  //If the user has chosen a tiled options display, let's figure out the icon names.
  getIconProps(str) {
    if (this.props.tiled) {
      return {
        iconName: this.getLeftIcon(str),
      }
    }

    return "";
  }

  //Parse the choice items
  setItems() {
    let items = csv2arr(this.props.items)
      .flat()
      .map((val, index) => ({
        text: getTokens(val).text,
        key: index,
        disabled: this.props.disabled,
        iconProps: this.getIconProps(val)
      }));

    //Let's try the new UXPin Parser

    let pitems = UXPinParser.parse(this.props.items).map(
      (item, index) => ({
        text: item.text,
        key: index,
      })
    );

    console.log(pitems);


    this.setState({
      items: items
    });
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

    //Get the value from state. Subtract 1 because it's stored as a 1-based index to be more user friendly.
    const selectedKey = this.state._index - 1;

    return (

      <FChoiceGroup
        {...this.props}
        options={this.state.items}
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
