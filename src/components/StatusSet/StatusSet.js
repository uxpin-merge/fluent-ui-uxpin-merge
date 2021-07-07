import * as React from 'react';
import * as PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import HorizontalStack from '../HorizontalStack/HorizontalStack';
import Text from '../Text/Text';
import { UxpStatus } from '../_helpers/uxpstatus';
import { UxpColors } from '../_helpers/uxpcolorutils';



const defaultGutter = 6;
const defaultIconColor = "neutralPrimary";

const posStart = 'start';
const posEnd = 'end';

const statusDefault = 'info';
const statusCustom = 'custom';
const statusList = [
   'info', 'success', 'done', 'warning', 'error', 'failed', 'skipped', 'unknown', 'blocked', 'syncing', 'inProgress', 'queued', 'waiting', 'currentStep', 'futureStep', 'reverted', 'restored', statusCustom
];


class StatusSet extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         statusList: UxpStatus.getStatuses(),
         status: UxpStatus.info,
      }
   }

   set() {

      this.setState({
         status: this.getSelectedStatus(),
      });
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.roleType !== this.props.roleType) {
         this.set();
      }
   }

   getSelectedStatus() {
      let status = UxpStatus.getStatusByRole(this.props.roleType);

      return status ? status : UxpStatus.info;
   }

   getIconSize() {
      let variant = this.props.size;

      switch (variant) {
         case '':
            return;
         case 'tiny':
            return 12;
         case 'xSmall':
            return 12;
         case 'small':
            return 14;
         case 'smallPlus':
            return 14;
         case 'medium':
            return 16;
         case 'mediumPlus':
            return 16;
         case 'large':
            return 20;
         case 'xLarge':
            return 24;
         case 'xxLarge':
            return 32;
         case 'mega':
            return 64;
         default:
            return 16;
      }
   }

   render() {
      let itemList = [];

      var iconName = UxpStatus.info.icon;
      var iconColor = UxpStatus.info.iconColor;
      var iconSize = this.getIconSize();
      var addIcon = true;

      var textVal = UxpStatus.info.text;
      var addText = true;

      if (this.props.roleType === statusCustom) {
         if (this.props.iconName) {
            iconName = this.props.iconName.trim();
         }
         else {
            addIcon = false;
         }

         if (addIcon) {
            let c = UxpColors.getHexFromHexOrToken(this.props.iconColor);
            if (c) {
               iconColor = c;
            }
            else {
               iconColor = UxpColors.getHexFromHexOrToken(defaultIconColor);
            }

            if (this.props.text) {
               textVal = this.props.text.trim();
            }
            else {
               addText = false;
            }
         }
      }
      else {
         let status = this.state.status;
         iconName = status.iconName;
         iconColor = UxpColors.getHexFromHexOrToken(status.color);

         textVal = status.text;
      }

      if (addIcon) {
         let iconUI = (
            <Icon
               {...this.props}
               iconName={iconName}
               color={iconColor}
               size={iconSize}
            />
         );

         itemList.push(iconUI);
      }

      if (addText) {
         let textUI = (
            <Text
               {...this.props}
               textValue={textVal}
               bold={this.props.bold}
               italic={this.props.italic}
               size={this.props.size}
            />
         );

         this.props.iconPosition === posStart ? itemList.unshift(textUI) : itemList.push(textUI);
      }

      return (

         <HorizontalStack
            {...this.props}
            widths={""}
            internalPadding={0}
            gutterPadding={this.props.gutterPadding}
            align={'stretch'}
            vAlign={'middle'}
            addSpanner={false}
            wrap={false}
            bgColor={''} >

            {itemList}

         </HorizontalStack>

      );
   }

};


/**
 * Set up the properties to be available in the UXPin property inspector.
 */
StatusSet.propTypes = {

   /**
    * @uxpindescription Reflect the control's role in the UI with its icon, color and text
    * @uxpinpropname Role
    * */
   roleType: PropTypes.oneOf(statusList),

   /**
    * @uxpindescription Row padding between the icon and text. Value must be 0 or more. 
    * @uxpinpropname Gutter
    */
   gutterPadding: PropTypes.number,

   /**
    * @uxpindescription The location to display an icon, if one is set
    * @uxpinpropname Icon Position
    * */
   iconPosition: PropTypes.oneOf([posStart, posEnd]),

   /**
    * @uxpindescription Custom icon to display. Note: Type must be set to 'Custom'.
    * @uxpinpropname Cust Icon Name
    * */
   iconName: PropTypes.string,

   /**
    * @uxpindescription Custom color for a custom icon. Use a color token or a standard Hex Color, such as '#0070BA', Note: Type must be set to 'Custom'.
    * @uxpinpropname Cust Icon Color
    * */
   iconColor: PropTypes.string,

   /**
   * @uxpindescription Custom text displayed in the control. Note: Type must be set to 'Custom'.
   * @uxpinpropname Cust Text
   * */
   text: PropTypes.string,

   /**
   * @uxpindescription To apply bold formatting
   */
   bold: PropTypes.bool,

   /**
    * @uxpindescription To apply italic formatting
    */
   italic: PropTypes.bool,

   /**
    * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
    */
   size: PropTypes.oneOf([
      'tiny',
      'xSmall',
      'small',
      'smallPlus',
      'medium',
      'mediumPlus',
      'large',
      'xLarge',
      'xxLarge',
      'mega',
   ]),

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
StatusSet.defaultProps = {
   roleType: statusDefault,
   gutterPadding: defaultGutter,
   iconPosition: posEnd,
   text: '',
   iconName: '',
   iconColor: '',
   bold: false,
   italic: false,
};


export { StatusSet as default };