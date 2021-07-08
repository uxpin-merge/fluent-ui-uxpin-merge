import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Breadcrumb as FBreadcrumb } from '@fluentui/react/lib/Breadcrumb';



const defaultMaxDisplayedItems = 5;
const defaultOverflowIndex = 1;
const defaultItems = `Home | http://www.uxpin.com
Examples 
Accordian`;



class Breadcrumb extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         _items: [],
      }
   }

   set() {
      let list = [];

      if (this.props.items) {
         let itemList = this.props.items.match(/[^\r\n]+/g);

         if (itemList && itemList.length) {

            for (var i = 0; i < itemList.length; i++) {
               let item = itemList[i];

               let token = this._parseTextAndLink(item, i);
               if (token)
                  list.push(token);
            }
         }
      }

      this.setState({
         _items: list,
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

   _parseTextAndLink(rawStr, order) {
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

            //Parse into a params object that Breadcrumb uses
            let token = {
               key: order,
               text: left,
               href: right,
               onClick: () => { this._onLinkClick(order + 1) },
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

      //If the prop for an individual nav item's click event exists, let's push it. 
      //Raise this event to UXPin. We'll send them info about which item was clicked on.
      if (this.props[`onLink${index}Click`]) {
         this.props[`onLink${index}Click`](index);
      }
   }

   render() {

      //Overflow
      //Convert to 0-based index.
      //Floor: 0 or higher. 
      //Ceiling: Number of displayed items - 1. 
      let overflow = this.props.overflowIndex - 1;
      let ceiling = this.props.maxDisplayedItems - 1;
      let oIndex = overflow < 0 ? 0 :
         overflow > ceiling ? ceiling :
            overflow;

      //MaxDisplayItems
      //Floor: 1
      //Ceiling: Any positive value
      let mDisplay = this.props.maxDisplayedItems < 1 ? 1 :
         this.props.maxDisplayedItems;

      let bStyles = {
         root: {
            marginTop: -5,
            marginBottom: -5,
            display: 'inline-block',
            width: 'min-content',
            height: 'min-content',
            selectors: {
               '& .ms-Breadcrumb-list': {
                  height: 'min-content',
                  verticalAlign: 'middle',
               }
            }
         }
      };

      return (
         <FBreadcrumb
            {...this.props}
            overflowIndex={oIndex}
            items={this.state._items}
            maxDisplayedItems={mDisplay}
            styles={bStyles}
         />
      );
   };
}

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Breadcrumb.propTypes = {

   /**
    * @uxpindescription The list of Breadcrumb items. Optionally, specify a link in the item, or capture the item's Click event using an Interaction.  To specify a link here, use this pattern: Display Text | http://www.website.com 
    * @uxpinpropname Items
    * @uxpincontroltype codeeditor
    */
   items: PropTypes.string,

   /**
    * @uxpindescription The maximum number of items to display before forcing extras into the overflow.
    * @uxpinpropname Max Displayed Items
    * */
   maxDisplayedItems: PropTypes.number,

   /**
    * @uxpindescription The 1-based index for grouping any overflow breadcrumb items
    * @uxpinpropname Overflow Index
    * */
   overflowIndex: PropTypes.number,

   /**
   * @uxpindescription Fires when Item 1 is clicked
   * @uxpinpropname Item 1 Click
   */
   onLink1Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 2 is clicked
   * @uxpinpropname Item 2 Click
   */
   onLink2Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 3 is clicked
   * @uxpinpropname Item 3 Click
   */
   onLink3Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 4 is clicked
   * @uxpinpropname Item 4 Click
   */
   onLink4Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 5 is clicked
   * @uxpinpropname Item 5 Click
   */
   onLink5Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 6 is clicked
   * @uxpinpropname Item 6 Click
   */
   onLink6Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 7 is clicked
   * @uxpinpropname Item 7 Click
   */
   onLink7Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 8 is clicked
   * @uxpinpropname Item 8 Click
   */
   onLink8Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 9 is clicked
   * @uxpinpropname Item 9 Click
   */
   onLink9Click: PropTypes.func,

   /**
   * @uxpindescription Fires when Item 10 is clicked
   * @uxpinpropname Item 10 Click
   */
   onLink10Click: PropTypes.func,
};

/**
* Set the default values for this control in the UXPin Editor.
*/
Breadcrumb.defaultProps = {
   items: defaultItems,
   maxDisplayedItems: defaultMaxDisplayedItems,
   overflowIndex: defaultOverflowIndex,
};


export { Breadcrumb as default };