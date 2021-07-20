import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TagPicker as FTagPicker } from '@fluentui/react/lib/Pickers';
import * as UXPinParser from '../_helpers/UXPinParser';


//Strings to display in the Suggestions UX
const suggestionProps = {
   suggestionsHeaderText: '', //Suggested Tags
   mostRecentlyUsedHeaderText: '', //Suggested Tags
   noResultsFoundText: 'No results found',
   loadingText: 'Loading...',
   showRemoveButtons: false,
   suggestionsAvailableAlertText: 'Tag Picker Suggestions available',
};



class TagPicker extends React.Component {

   constructor(props) {
      super(props);

      //State currently unused. 
      this.state = {

         //The list of those tags that are currently selected
         selectedItems: [],

         //The list of those tags that should appear in the suggestion list
         //This list is constantly updated, filtered, and displayed in the UI
         suggestionList: [],

         //The list of all tags we use in this UXPin demo. We push selected tag indexes back to the user in UXPin.
         allTags: []
      }
   }


   set() {
      //We'll set this list as the default suggestion list. 
      // var suggestions = csv2arr(this.props.items)
      //    .flat()
      //    .map((val, index) => ({
      //       name: getTokens(val).text,
      //       key: index + 1,
      //    }));

      let suggestions = UXPinParser.parse(this.props.items).map(
         (item, index) => ({
            name: item.text,
            key: index + 1,
         })
      );

      console.log("suggestions length: " + suggestions?.length);
      var i = 0;
      for (i = 0; i < suggestions.length; i++) {
         console.log("suggestions itm: " + suggestions[i].text);
      }

      //We keep this duplicate to track selected tag indexes
      let items = UXPinParser.parse(this.props.items).map(
         (item, index) => ({
            name: item.text,
            key: index + 1,
         })
      );

      //Finally, let's figure out whether to pre-populate any suggested items. 
      var prepopulatedList = [];
      if (this.props.selectedIndexes) {
         prepopulatedList = this.parseSelectedIndexes(this.props.selectedIndexes, items.length);
      }

      var selectedItems = [];
      if (prepopulatedList && prepopulatedList.length > 0) {
         var x;
         for (x = 0; x < prepopulatedList.length; x++) {
            let index = prepopulatedList[x]; //Index should be a number
            if (index < items.length) {
               let t = items[index];
               selectedItems.push(t);
            }
         }
      }

      this.setState({
         selectedItems: selectedItems,
         suggestionList: suggestions,
         allTags: items,
      })
   }

   /**
    * Parses a string that contains a list of numbers. Accepts comma or space delimited numbers. 
    * @param {string} rawList A string that contains a list of numbers.
    * @param {number} maxCount The max number of items available. For example, if there are only 10 items, then the number 11 will be disregarded.
    * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
    */
   parseSelectedIndexes(rawList, maxCount) {
      if (!rawList || rawList.trim().length === 0)
         return;

      //Find Ints only
      let regex = /\d+/g;
      let result = rawList.match(regex);

      var indexList = [];

      //Now we have to go through, validate the numbers, and adjust them to be 0-based index values
      if (result && result.length > 0) {
         var i;
         for (i = 0; i < result.length; i++) {
            var item = result[i]

            if (item < 1 || item > maxCount) {
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
    * Returns the text to display in the UI. 
    * @param {Object} item - A tag params object 
    * @returns {string} Returns the text to display in the UI.
    */
   _getTextFromItem(item) {
      if (!item || !item.name)
         return "";

      //Let's send back the text
      return item.name;
   }

   /**
    * Returns a Tag params object from the current list of Tags.
    * REQUIRED - Picker must handle onResolveSuggestions. 
    * @param {string} filterText 
    * @returns {Array} A filtered array of Tags suitable for displaying in the Suggestions list.
    */
   _onFilterChanged(filterText) {
      if (filterText) {
         //First, create a list of suggestions that match the filter text
         var filteredList = this.filterItemsByText(filterText);

         //Now, remove duplicates of already selected items
         filteredList = this.removeDuplicates(filteredList, this.state.selectedItems);

         return filteredList;
      }

      //If we made it this far, then lets send an empty array.
      return [];
   }

   /**
    * Returns a filtered list of Tag params objects where the text contains the given filter text.
    * Supports the onResolveSuggestions workflow.
    * @param {string} filterText Some text entered by the user at runtime 
    * @returns {Array} A filtered array of Tag items suitable for displaying in the Suggestions list.
    */
   filterItemsByText(filterText) {
      let fText = filterText.toLowerCase();
      let filteredList = this.state.suggestionList.filter(
         function (item) {
            let name = item.name.toLowerCase();
            return name.includes(fText);
         });

      return filteredList;
   }

   /**
    * Removes potential duplicates from the given array, then returns the resulting array list. 
    * For both arrays, use lists of Tag item params. 
    * Returns the resulting list. 
    * @param {Array} itemList This is our main list of Tag param objects 
    * @param {Array} possibleDuplicates - This is the list of Tag param objects which might be duplicates of the main one.
    * @returns {Array} A potential sub-set of the main list of Tags, with potential duplicates filtered out.
    */
   removeDuplicates(itemList, possibleDuplicates) {
      return itemList.filter(item => !this.listContainsItem(item, possibleDuplicates));
   }

   /**
    * Determine whether a list contains the given Tag. 
    * @param {string} tag - A Tag params object
    * @param {Array} itemList - An array of Persona params objects
    * @returns {boolean} True if the list contains the given Persona, false if it doesn't. 
    */
   listContainsItem(tag, itemList) {
      if (!itemList || !itemList.length || itemList.length === 0)
         return false;

      if (!tag || !tag.name || tag.name.trim() === '')
         return false;

      return itemList.filter(item => item.name === tag.name).length > 0;
   }


   /**
    * Get the index of a Tag by its text. 
    * The index is the full list of Tags we're using in this UXPin experience. 
    * @param {string} tagText - The full text, as provided, for a Tag. 
    * @returns {number} The index of the given Tag in the full list of all Tags. Returns -1 if no match.
    */
   getTagIndex(tagText) {
      let tags = this.state.allTags;

      var i;
      for (i = 0; i < tags.length; i++) {
         let t = tags[i];
         if (tagText == t.name)
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

      //If the user has set a listener, let's send the list of selected indexes
      //This is a 1-based list of indexes.
      if (this.props.onChange) {
         //Let's create a list of selected indexes
         var indexList = [];
         var i;

         for (i = 0; i < items.length; i++) {
            let index = this.getTagIndex(items[i].name);
            if (index > -1)
               indexList.push(index + 1);
         }

         //Sort numerically
         indexList.sort(function (a, b) {
            return a - b;
         });

         this.props.onChange(indexList.toString());
      }

      //Let's replace the old list in memory
      this.setState(
         { selectedItems: items }
      )
   }


   render() {

      return (

         <FTagPicker
            {...this.props}
            pickerSuggestionsProps={suggestionProps}
            disabled={this.props.disabled}
            selectedItems={this.state.selectedItems}
            getTextFromItem={(i) => this._getTextFromItem(i)}
            onResolveSuggestions={(f, s) => this._onFilterChanged(f, s)}
            onChange={(items) => this._onItemsChanged(items)}
         />
      );
   }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
TagPicker.propTypes = {

   /**
    * @uxpindescription Of the 10 total Personas available, enter a list of 1-based index values for default items to be shown as selected (Optional). This prop's live value is available for scripting.
    * @uxpinpropname * Indexes
    * @uxpinbind onChange
    * */
   selectedIndexes: PropTypes.string,

   /**
    * @uxpindescription The list of tags. Put one tag on each row. Enclose an item in quotes if including a comma. Icons are not currently supported.
    * @uxpincontroltype codeeditor
    */
   items: PropTypes.string.isRequired,

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


TagPicker.defaultProps = {
   items: '',
   selectedIndexes: '',
   disabled: false,
};


export { TagPicker as default };