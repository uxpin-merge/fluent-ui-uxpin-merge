import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '../Button/Button';
import HorizontalStack from '../HorizontalStack/HorizontalStack';
import { getTokens, csv2arr } from '../_helpers/parser';



//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultItems = `icon(EmojiDisappointed) Poor
icon(EmojiNeutral) Neutral
icon(Emoji2) Good`;


class GroupButton extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         items: [],
         selectedIndex: 1, //1 based
      }
   }

   set() {

      var items = [];

      if (this.props.items) {
         items = csv2arr(this.props.items)
            .flat()
            .map((val, index) => ({
               text: getTokens(val).text,
               key: index + 1,
               icon: this.getLeftIcon(val)
            }));
      }

      //Adjust against the floor (0) and ceiling (number of items)
      //If it's 0 then nothing is selected, which is OK for some use cases.
      let index = this.props.selectedIndex < 0 ? 0 :
         this.props.selectedIndex > items.length ? items.length :
            this.props.selectedIndex;

      //Store the selected index as 1 based, same as user input
      this.setState({
         items: items,
         selectedIndex: index
      });
   }

   //Get the user-entered left icon name, if there is one
   getLeftIcon(str) {
      const tokens = getTokens(str).tokens
      const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
      return leftIcon ? leftIcon.target : null
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.items !== this.props.items
         || prevProps.selectedIndex !== this.props.selectedIndex) {

         this.set();
      }
   }

   _onButtonClick(index) {

      //The index comes in 1-based. 1 is also our value floor.
      let newIndex = index > 0 ? index : 1;

      if (newIndex !== this.state.selectedIndex) {
         this.setState(
            { selectedIndex: newIndex }
         )

         //If the index changed, let's push the new index value
         if (this.props.onButtonClick) {
            this.props.onButtonClick(newIndex);
         }
      }
   }

   render() {

      //Set up the Buttons individually
      let items = this.state.items;
      var i;
      var buttonList = [];

      let btnStyles = {
         root: {
            borderRadius: 0,
         }
      }

      for (i = 0; i < items.length; i++) {
         let btn = items[i];

         let isPrimary = ((i + 1) === this.state.selectedIndex) ? true : false;

         //The key is already 1 based
         let button = (
            <Button
               {...this.props}
               primary={isPrimary}
               text={btn.text}
               iconName={btn.icon}
               disabled={this.props.disabled}
               styles={btnStyles}
               onClick={() => { this._onButtonClick(btn.key) }}
            />
         );
         buttonList.push(button);
      }

      return (

         <HorizontalStack
            {...this.props}
            widths={""}
            internalPadding={0}
            gutterPadding={0}
            align={'stretch'}
            vAlign={'middle'}
            addSpanner={false}
            wrap={false}
            bgColor={''} >

            {buttonList}

         </HorizontalStack>

      );


   }

};


/**
 * Set up the properties to be available in the UXPin property inspector.
 */
GroupButton.propTypes = {

   /**
   * @uxpindescription The 1-based index value of the default item to be shown as selected (Optional). This prop's live value is available for scripting.
   * @uxpinpropname * Index
   * @uxpinbind onButtonClick
    * */
   selectedIndex: PropTypes.number,

   /**
   * @uxpindescription The list of options. Put each option on a separate line. Enclose an item in quotes to include a comma within it.  Supports the icon(IconName) syntax. For example: icon(Home) Home
   * @uxpinpropname Items
   * @uxpincontroltype codeeditor
    * */
   items: PropTypes.string,

   /**
    * @uxpindescription Whether to show the control as disabled
    * @uxpinpropname Disabled
    * */
   disabled: PropTypes.bool,

   /**
    * @uxpindescription Fires when the selected index value changes.
    * @uxpinpropname * Click
    * */
   onButtonClick: PropTypes.func

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
GroupButton.defaultProps = {
   disabled: false,
   items: defaultItems,
   selectedIndex: 1,
};


export { GroupButton as default };