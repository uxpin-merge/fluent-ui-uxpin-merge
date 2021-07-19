import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NormalPeoplePicker, ListPeoplePicker } from '@fluentui/react/lib/Pickers';
import { UxpPersonaData } from '../_helpers/uxppersonadata';



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
}

const maxNumberOfPersonas = 10;



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
         allPersonas: []
      }
   }


   set() {
      //We'll set this list as the default suggestion list. 
      var suggestions = UxpPersonaData.getPersonaList(maxNumberOfPersonas);

      //We keep this duplicate to track selected persona indexes
      let personas = UxpPersonaData.getPersonaList(maxNumberOfPersonas);
      personas.sort(function (a, b) {
         var x = a.text.toLowerCase();
         var y = b.text.toLowerCase();
         if (x < y) { return -1; }
         if (x > y) { return 1; }
         return 0;
      });

      //The suggestion list shows the Secondary Text line. 
      //      Let's populate that with email addresses. 
      var i;
      for (i = 0; i < suggestions.length; i++) {
         var p = suggestions[i];
         p.secondaryText = p.email;
      }

      //Finally, let's figure out whether to pre-populate any suggested items. 
      var prepopulatedList = [];
      if (this.props.selectedIndexes) {
         prepopulatedList = this.parseSelectedIndexes(this.props.selectedIndexes);
      }

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
      if (
         prevProps.selectedIndexes !== this.props.selectedIndexes
      ) {
         this.set();
      }
   }


   /**
    * Parses a string that contains a list of numbers. Accepts comma or space delimited numbers. 
    * @param {string} rawList A string that contains a list of numbers.
    * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
    */
   parseSelectedIndexes(rawList) {
      if (!rawList || rawList?.trim().length === 0)
         return [];

      //Find Ints only
      let regex = /\d+/g;
      let result = rawList.match(regex);

      var indexList = [];

      //Now we have to go through, validate the numbers, and adjust them to be 0-based index values
      if (result && result?.length > 0) {
         var i;
         for (i = 0; i < result.length; i++) {
            var item = result[i]

            if (item < 1 || item > maxNumberOfPersonas) {
               //Toss it. Can't use it. 
            }
            else {
               //User input is 1-based, so subtract 1.
               item = item - 1;
               indexList.push(item);
            }
         }
      }

      return indexList;
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
            let email = persona.email.toLowerCase();

            let includedInName = name.includes(fText);

            //Checking if it's in email is 
            var includedInEmail = false;
            let index = email.indexOf("@");
            if (index > -1) {
               let uniquename = email.slice(0, index);
               includedInEmail = uniquename.includes(fText);
            }

            return (includedInName || includedInEmail);
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

      return (
         <div>
            {this.props.inline
               ? //Display normal one
               <NormalPeoplePicker
                  {...this.props}
                  key={'normal'}
                  className={'ms-PeoplePicker'}
                  styles={textfieldStyle}
                  pickerSuggestionsProps={suggestionProps}
                  disabled={this.props.disabled}
                  selectedItems={this.state.selectedItems}
                  getTextFromItem={(i) => this._getTextFromItem(i)}
                  onResolveSuggestions={(f, s) => this._onFilterChanged(f, s)}
                  onChange={(items) => this._onItemsChanged(items)}
               />
               : //Or display the inline option
               <ListPeoplePicker
                  {...this.props}
                  key={'list'}
                  className={'ms-PeoplePicker'}
                  styles={textfieldStyle}
                  pickerSuggestionsProps={suggestionProps}
                  disabled={this.props.disabled}
                  selectedItems={this.state.selectedItems}
                  getTextFromItem={(i) => this._getTextFromItem(i)}
                  onResolveSuggestions={(f, s) => this._onFilterChanged(f, s)}
                  onChange={(items) => this._onItemsChanged(items)}
               />

            } </div>
      );
   }

}

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PeoplePicker.propTypes = {

   /**
    * @uxpindescription Of the 10 total Personas available, enter a list of 1-based index values for default items to be shown as selected (Optional). This prop's live value is available for scripting.
    * @uxpinpropname * Indexes
    * @uxpinbind onChange
    * */
   selectedIndexes: PropTypes.string,

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
}


PeoplePicker.defaultProps = {
   inline: false,
   selectedIndexes: '',
   disabled: false,
};

export { PeoplePicker as default };