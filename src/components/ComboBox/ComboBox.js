import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ComboBox as FComboBox } from '@fluentui/react/lib/ComboBox';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import * as UXPinParser from '../_helpers/UXPinParser';



const defaultItems = `Apples
Bananas
"I love you, Grapes!"
Pears`;



class ComboBox extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         //default must be undefined
         _selectedIndex: undefined,
         _selectedIndices: [],
         items: [],
      }
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.items !== this.props.items
         || prevProps.selected !== this.props.selected) {
         this.set();
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

      let items = UXPinParser.parse(this.props.items).map(
         (item, index) => ({
            text: item?.text,
            key: index,
            disabled: false,
         })
      );

      this.setState({
         items: items,
         _selectedIndex: index,
         _selectedIndices: list,
      })
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

   //To process the onChange event for a single select use case. 
   _onChangeSingle(index) {
      //We MUST set the state with the updated index value. This will also force the control to update in UXPin at runtime.
      this.setState(
         { _selectedIndex: index }
      )

      //Raise this event to UXPin. We'll send them the new index value.
      //For the end user in UXPin, convert the index to a 1-based number. 
      //Always pass a string -- not a number. 
      if (this.props.onChoiceChange) {
         this.props.onChoiceChange((index + 1).toString());
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
      if (selected && included === false) {
         keys.push(key);
      }
      else if (selected === false && included) {

         //Otherwise let's remove it from our tracking array. 
         let filtered = keys.filter(
            function (currVal) {
               return currVal != key;
            });

         // Now we set the filtered array to the keys array.
         keys = filtered;
      }

      //We MUST update the state with the new values. This will also force the control to update in UXPin at runtime.
      this.setState(
         { _selectedIndices: keys }
      )

      //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
      if (this.props.onChoiceChange) {
         let list = keys.sort().map(key => key + 1).toString();
         this.props.onChoiceChange(list);
      }
   }

   render() {
      //Microsoft uses one prop for both single and multi-select use cases, unlike the Dropdown. 
      var keys = this.state._selectedIndex;

      if (this.props.multiSelect &&
         this.state._selectedIndices) {
         keys = this.state._selectedIndices;
      }

      //Convert the autocomplete boolean to one of Microsoft's preferred strings.
      let autoComplete = this.props.autoComplete ? "on" : "off";

      return (

         <FComboBox
            {...this.props}
            options={this.state.items}
            autoComplete={autoComplete}
            selectedKey={keys}
            onChange={(e, o, i, v) => { this._onChoiceChange(o, i); }}
         />

      );
   }

};


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ComboBox.propTypes = {

   /**
    * @uxpindescription The label for the control
    * @uxpinpropname Label
    * @uxpincontroltype textfield(2)
    * */
   label: PropTypes.string,

   /**
    * @uxpindescription Placeholder text to show until an item(s) is selected
    * @uxpinpropname Placeholder
    */
   placeholder: PropTypes.string,

   /**
    * @uxpindescription The list of available options. Put each item on a separate line. Put quotes around an item to use a comma in it. 
    * @uxpincontroltype codeeditor
    */
   items: PropTypes.string,

   /**
    * @uxpindescription The selected indexes, separated with commas (1-based index). In case of Single Select mode, the first number will be used if multiple values are provided. This prop's live value is available for scripting.
    * @uxpinbind onChoiceChange
    * @uxpinpropname * Indexes
    * */
   selected: PropTypes.string,

   /**
    * @uxpindescription To allow multiple selections
    * @uxpinpropname Multi-select
    */
   multiSelect: PropTypes.bool,

   /**
    * Microsoft uses the values: "on", "off" 
    * @uxpindescription Whether the ComboBox auto completes. As the user is inputing text, it will be suggested potential matches from the list of options. 
    * @uxpinpropname Auto-Complete
    */
   autoComplete: PropTypes.bool,

   /**
    * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
    * @uxpinpropname Error Message
    */
   errorMessage: PropTypes.string,

   /**
    * @uxpindescription To disable the control
    * @uxpinpropname Disabled
    * */
   disabled: PropTypes.bool,

   /**
    * @uxpindescription Fires when the selected index(es) changes.
    * @uxpinpropname * Indexes Changed
    * */
   onChoiceChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ComboBox.defaultProps = {
   label: "ComboBox",
   placeholder: "- Select -",
   disabled: false,
   multiSelect: false,
   autoComplete: false,
   items: defaultItems,
};


export { ComboBox as default };
