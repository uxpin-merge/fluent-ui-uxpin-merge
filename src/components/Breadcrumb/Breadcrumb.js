import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Breadcrumb as FBreadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { getTokens } from '../_helpers/parser';



const defaultItems = `Home | http://www.uxpin.com
Examples | https://www.uxpin.com/examples/
Accordian | https://www.uxpin.com/examples/accordion`;



class Breadcrumb extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         _items: [],
         _selectedIndex: 0,
      }
   }

   set() {
      let list = [];
      var currentItem = 0;

      if (this.props.items) {
         let itemList = this.props.items.match(/[^\r\n]+/g);

         if (itemList && itemList.length) {

            //Adjust for floor and ceiling. 1-based. 0 for none.
            currentItem = this.props.currentItem < 0 ? 0 :
               this.props.currentItem > (itemList.length - 1) ? itemList.length - 1 :
                  this.props.currentItem;

            //Prepare for use by Breadcrumb. Must be 0 based.
            let adjustedCurrentItem = currentItem - 1;

            console.log("Set. Item count: " + itemList.length);

            for (var i = 0; i < itemList.length; i++) {
               let item = itemList[i];

               let isCurrent = adjustedCurrentItem === i;
               let token = this._parseTextAndLink(item, i, isCurrent);

               if (token)
                  list.push(token);
            } //for loop
         } //if items
      } //if props.links

      this.setState({
         _items: list,
         _selectedIndex: this.props.currentItem,
      })
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.items !== this.props.items) {
         this.set();
      }
   }

   _parseTextAndLink(rawStr, order, isCurrent) {
      if (rawStr && rawStr.length) {
         let links = rawStr.split("|");

         //First display side
         if (links && links.length) {
            let left = links[0]?.trim();     //This is the display text
            var right = '';          //This is the optional link

            if (links[1]) {
               //right = links[1]?.trim();
               let href = this.normalizeLink(links[1]?.trim());
               if (href) {
                  right = href;
               }
            }

            console.log("Left: " + left + " ; right: " + right);

            //Parse into a params object that Breadcrumb uses
            let token = {
               key: order,
               text: left,
               href: right,
               isCurrentItem: isCurrent,
               onClick: () => { this._onLinkClick(order + 1) }
            };

            return token;
         }
      }
   };

   /**
    * Function to normalize links by adding 'http://'
    */
   normalizeLink(inputStr) {
      if (inputStr?.includes('http') ||
         inputStr?.includes('tel:') ||
         inputStr?.includes('mailto:') ||
         inputStr == undefined) {
         return inputStr;
      }
      else {
         return `http://${inputStr}`;
      }
   }

   _onLinkClick(index) {
      //The index comes in 1-based.

      //If the index changed, let's push the new index value
      // if (this.props.onIndexChanged) {
      //    this.props.onIndexChanged(newIndex);
      // }

   }

   render() {

      let bStyles = {
         root: {
            display: 'block',  //Fixes the 'nudge up/down' issues for larger and smaller sizes
            lineHeight: 'normal',  //Fixes the janked line height issues for larger and smaller sizes
         }
      };

      return (
         <FBreadcrumb
            items={this.state._items}
            styles={bStyles}
         />
      );


   };

   /** 
    * Set up the properties to be available in the UXPin property inspector. 
    */
   Breadcrumb.propTypes = {

      /**
       * @uxpindescription The list of Breadcrumb items. Put each item on a separate line using this pattern: Display Text | http://www.website.com (Optional)
       * @uxpinpropname Items
       * @uxpincontroltype codeeditor
       */
      items: PropTypes.string,

      /**
       * @uxpindescription The 1-based index for the item to display as the 'current item'. Use 0 if no item should be shown as the current one.
       * @uxpinpropname Current Item
       * */
      currentItem: PropTypes.number,

   };

   /**
   * Set the default values for this control in the UXPin Editor.
   */
   Breadcrumb.defaultProps = {
      items: defaultItems,
      currentItem: 0,
   };


export { Breadcrumb as default };