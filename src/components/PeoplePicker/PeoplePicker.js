import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Label } from '@fluentui/react/lib/Label';
import { NormalPeoplePicker, ListPeoplePicker } from '@fluentui/react/lib/Pickers';
import { UxpPersonaData } from '../_helpers/uxppersonadata';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';



//Strings to display in the Suggestions UX
const suggestionProps = {
   suggestionsHeaderText: '', //Suggested People
   mostRecentlyUsedHeaderText: '', //Suggested Contacts
   noResultsFoundText: 'No results found',
   loadingText: 'Loading...',
   showRemoveButtons: false,
   suggestionsAvailableAlertText: 'People Picker Suggestions available',
};

//Put a little space between the text field and list of selected users
const textfieldStyle = {
   text: {
      marginBottom: '12px',
   }
};



class PeoplePicker extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         //The list of those Personas that are currently selected
         selectedItems: [],

         //The list of those Personas that should appear in the suggestion list
         //This list is constantly updated, filtered, and displayed in the UI
         suggestionList: [],

         //The list of all personas we use in this UXPin demo. We push selected persona indexes back to the user in UXPin.
         allPersonas: [],
      }
   }

   set() {

      //We get duplicate lists 
      let suggestions = this._getPeopleList();
      let personas = this._getPeopleList();

      //Determine whether to pre-populate any persons. 
      let prepopulatedList = this.parseSelectedIndexes(this.props.selectedIndexes, personas.length);

      var selectedItems = [];
      if (prepopulatedList && prepopulatedList.length > 0) {
         var x;
         for (x = 0; x < prepopulatedList.length; x++) {
            let index = prepopulatedList[x];
            if (index < personas.length) {
               let p = personas[index];
               selectedItems.push(p);
            }
         }
      }

      this.setState({
         selectedItems: selectedItems,
         suggestionList: suggestions,
         allPersonas: personas
      })
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.selectedIndexes !== this.props.selectedIndexes ||
         prevProps.persons !== this.props.persons) {
         this.set();
      }
   }

   _getPeopleList() {
      let people = [];

      if (this.props.persons) {
         let items = this.props.persons.match(/[^\r\n]+/g);

         if (items && items.length) {
            for (var i = 0; i < items.length; i++) {
               let item = items[i];

               let personInfo = this._parsePersonInfo(item);

               if (personInfo)
                  people.push(personInfo);
            }
         }
      }

      return people;
   }

   _parsePersonInfo(rawStr) {
      if (rawStr && rawStr.length) {
         //If it's a Persona token...
         if (rawStr.toLowerCase().startsWith("person")) {

            let tData = UxpPersonaData.getPersonaByToken(rawStr);
            if (tData) {

               let personInfo = {
                  text: tData.text,
                  secondaryText: tData.email,
                  email: tData.email,
                  imageUrl: tData.imageUrl,
               };
               return personInfo;
            }
         }
         else {

            //If the user entered it...
            let pData = rawStr.split("|");

            //Parse left side: display name
            if (pData && pData.length) {

               let left = pData[0].trim();

               //This is the optional Line 2 for the suggestions list. it might be an email address.
               let right = pData[1] ? pData[1].trim() : '';
               let email = right.includes('@') ? right : '';

               let personInfo = {
                  text: left && left.length > 0 ? left : right,
                  secondaryText: right,
                  email: email,
               };
               return personInfo;
            }
         }
      }

      //If we made it this far, there were errors.
      return undefined;
   }

   /**
    * Parses a string that contains a 1-based list of numbers. Accepts comma or space delimited numbers. 
    * @param {string} rawList A string that contains a list of numbers. This is a 1-based list of numbers.
    * * @param {string} max The max value for the 1-based list. 
    * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
    */
   parseSelectedIndexes(rawList, max) {
      return UxpNumberParser.parseIntsWithOptions(rawList, -1, 0, max);
   }

   /**
    * Returns the full name of the Persona to display in the UI. 
    * @param {Object} item - A Persona params object 
    * @returns {string} Returns the full name of the Persona to display in the UI.
    */
   _getTextFromItem(item) {
      if (!item || !item.text)
         return "";

      //Let's send back the full name
      return item.text;
   }

   /**
    * Returns a Persona params object from the current list of Personas.
    * REQUIRED - Supports the onResolveSuggestions workflow. 
    * @param {string} filterText 
    * @returns {Array} A filtered array of Personas suitable for displaying in the Suggestions list.
    */
   _onFilterChanged(filterText) {
      if (filterText) {
         //First, create a list of suggestions that match the filter text
         var filteredList = this.filterPersonasByText(filterText);

         //Now, remove duplicates of already selected people
         filteredList = this.removeDuplicates(filteredList, this.state.selectedItems);

         filteredList.sort(function (a, b) {
            var x = a.text.toLowerCase();
            var y = b.text.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
         });

         return filteredList;
      }

      //If we made it this far, then lets send an empty array.
      return [];
   }

   /**
    * Returns a filtered list of Persona params objects where the full name or email address contains the given filter text.
    * REQUIRED - Supports the onResolveSuggestions workflow.
    * @param {string} filterText Some text entered by the user at runtime
    * @returns {Array} A filtered array of Personas suitable for displaying in the Suggestions list.
    */
   filterPersonasByText(filterText) {
      let fText = filterText.toLowerCase();
      let filteredList = this.state.suggestionList.filter(
         function (persona) {
            let name = persona.text.toLowerCase();
            let line2 = persona.secondaryText.toLowerCase();

            let includedInName = name.includes(fText);

            //Checking if it's in Line 2, which is often but not always an email address
            var includedInLine2 = false;
            var secondaryTxt = line2;

            if (line2.includes('@')) {
               let index = line2.indexOf("@");
               if (index > -1) {
                  secondaryTxt = line2.slice(0, index);
               }
            }
            includedInLine2 = secondaryTxt.includes(fText);

            return (includedInName || includedInLine2);
         });

      return filteredList;
   }

   /**
    * Removes potential duplicates from the given array, then returns the resulting array list. 
    * For both arrays, use lists of Persona params. 
    * Returns the resulting list. 
    * @param {Array} personaList This is our main list of Persona param objects 
    * @param {Array} possibleDuplicates - This is the list of Persona param objects which might be duplicates of the main one.
    * @returns {Array} A potential sub-set of the main list of Personas, with potential duplicates filtered out.
    */
   removeDuplicates(personaList, possibleDuplicates) {
      return personaList.filter(persona => !this.listContainsPersona(persona, possibleDuplicates));
   }

   /**
    * Determine whether a list contains the given Persona. 
    * @param {string} persona - A Persona params object
    * @param {Array} personaList - An array of Persona params objects
    * @returns {boolean} True if the list contains the given Persona, false if it doesn't. 
    */
   listContainsPersona(persona, personaList) {
      if (!personaList || !personaList.length || personaList.length === 0)
         return false;

      if (!persona || !persona.text || persona.text.trim() === '')
         return false;

      return personaList.filter(item => item.text === persona.text).length > 0;
   }

   /*
    * Get the index of a Persona by their full name. 
    * The index is the full list of Personas we're using in this UXPin experience. 
    * @param {string} name - The full name, as provided, for a Persona. 
    * @returns {number} The index of the given Persona in the full list of all Personas. Returns -1 if no match.
    */
   getPersonaIndex(name) {
      let personas = this.state.allPersonas;

      var i;
      for (i = 0; i < personas.length; i++) {
         let p = personas[i];
         if (name == p.text)
            return i;
      }

      //If we made it this far, there was no match
      return -1;
   }

   /**
    * Handle the new list of selected items. 
    * Microsoft sends in the full list of selected items every time, rather than just a delta. So let's save them.
    * @param {Array} items The full list of selected items.
    */
   _onItemsChanged(items) {

      //Let's replace the old list in memory
      this.setState(
         { selectedItems: items }
      )

      //If the user has set a listener, let's send the list of selected indexes
      //This is a 1-based list of indexes. 
      if (this.props.onChange) {
         //Let's create a list of selected indexes
         var indexList = [];
         var i;

         for (i = 0; i < items.length; i++) {
            let index = this.getPersonaIndex(items[i].text);
            if (index > -1)
               indexList.push(index + 1);
         }

         //Sort numerically
         indexList.sort(function (a, b) {
            return a - b;
         });

         this.props.onChange(indexList.toString());
      }
   }

   render() {
      let ppID = _.uniqueId('peoplepicker_');
      let ppLabelText = this.props.label ? this.props.label?.trim() : undefined;

      let ppLabel = ppLabelText ? (
         <Label
            {...this.props}
            required={this.props.required}
            disabled={this.props.disabled}
            htmlFor={ppID}
         >
            {ppLabelText}
         </Label>
      ) : '';

      return (
         <>
            {ppLabel}
            {this.props.inline ?
               <NormalPeoplePicker
                  {...this.props}
                  key={'normal'}
                  id={ppID}
                  className={'ms-PeoplePicker'}
                  styles={textfieldStyle}
                  pickerSuggestionsProps={suggestionProps}
                  disabled={this.props.disabled}
                  selectedItems={this.state.selectedItems}
                  getTextFromItem={(i) => this._getTextFromItem(i)}
                  onResolveSuggestions={(f, s) => this._onFilterChanged(f, s)}
                  onChange={(items) => this._onItemsChanged(items)}
               />

               :
               <ListPeoplePicker
                  {...this.props}
                  key={'list'}
                  id={ppID}
                  className={'ms-PeoplePicker'}
                  styles={textfieldStyle}
                  pickerSuggestionsProps={suggestionProps}
                  disabled={this.props.disabled}
                  selectedItems={this.state.selectedItems}
                  getTextFromItem={(i) => this._getTextFromItem(i)}
                  onResolveSuggestions={(f, s) => this._onFilterChanged(f, s)}
                  onChange={(items) => this._onItemsChanged(items)}
               />

            }
         </>
      );
   }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PeoplePicker.propTypes = {

   /**
    * @uxpindescription The label for the Text Field
    * @uxpinpropname Label
    * @uxpincontroltype textfield(2)
    * */
   label: PropTypes.string,

   /**
    * @uxpindescription To display the 'required' flag on the label
    * @uxpinpropname Required
    * */
   required: PropTypes.bool,

   /**
    * @uxpindescription Of the 10 total Personas available, enter a list of 1-based index values for default items to be shown as selected (Optional). This prop's live value is available for scripting.
    * @uxpinpropname * Indexes
    * @uxpinbind onChange
    * */
   selectedIndexes: PropTypes.string,

   /**
    * @uxpindescription The list of potential People matches. Put each person on a separate line. Use the Persona tokens, or create your own people info for Lines 1 and 2 in the Suggested Match list using the pattern: Display Name | dname@company.com (or any value for Line 2)
    * @uxpinpropname People List
    * @uxpincontroltype codeeditor
    * */
   persons: PropTypes.string,

   /**
    * @uxpindescription To display selected persons inline rather than below the input field
    * @uxpinpropname Inline Selections
    * */
   inline: PropTypes.bool,

   /**
    * @uxpindescription To disable the control
    * */
   disabled: PropTypes.bool,

   /**
    * @uxpindescription Fires when the list of selected indexes changes.
    * @uxpinpropname * Indexes Changed
    * */
   onChange: PropTypes.func,
};


PeoplePicker.defaultProps = {
   label: "Testing",
   required: false,
   selectedIndexes: '',
   persons: '',
   inline: false,
   disabled: false,
};


export { PeoplePicker as default };