import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import HorizontalStack from '../HorizontalStack/HorizontalStack';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { UxpStatus } from '../_helpers/uxpstatus';
import { UxpColors } from '../_helpers/uxpcolorutils';



const defaultGutter = 6;
const defaultIconColor = "neutralPrimary";
const defaultSize = 'medium';

const posStart = 'start';
const posEnd = 'end';

const statusDefault = 'info';
const statusCustom = 'custom';
const statusList = [
   'info', 'success', 'done', 'ok', 'good', 'ready', 'passed', 'completed', 'approved', 'warning', 'error', 'failed', 'offline', 'pending', 'validating', 'skipped', 'unknown', 'blocked', 'syncing', 'inProgress', 'queued', 'waiting', 'currentStep', 'futureStep', 'scheduled', 'reverted', 'restored', statusCustom
];
const iconSizeMap = {
   tiny: 10,
   xSmall: 10,
   small: 14,
   smallPlus: 14,
   medium: 16,
   mediumPlus: 16,
   large: 18,
   xLarge: 22,
   xxLarge: 32,
   mega: 64,
};



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

   render() {
      let itemList = [];

      var iconName = UxpStatus.info.icon;
      var iconColor = UxpStatus.info.iconColor;
      var iconSize = iconSizeMap[this.props.size];
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

         this.props.iconPosition === posStart ? itemList.push(textUI) : itemList.unshift(textUI);
      }

      const ttTargetID = _.uniqueId('ttTarget_');
      const tooltipID = _.uniqueId('tooltip_');
      const ttProps = {
         gapSpace: 2,
         target: `#${ttTargetID}`,
      };

      return (
         <>
            <TooltipHost
               content={this.props.tooltip}
               id={tooltipID}
               directionalHint={DirectionalHint.topLeftEdge}
               calloutProps={ttProps}
            >
               <HorizontalStack
                  {...this.props}
                  widths={""}
                  internalPadding={0}
                  gutterPadding={this.props.gutterPadding}
                  align={'stretch'}
                  vAlign={'center'}
                  addSpanner={false}
                  wrap={false}
                  bgColor={''}
                  id={ttTargetID}
                  aria-describedby={tooltipID} >

                  {itemList}

               </HorizontalStack>
            </TooltipHost>
         </>

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

   /**
   * @uxpindescription To apply bold formatting
   */
   bold: PropTypes.bool,

   /**
    * @uxpindescription To apply italic formatting
    */
   italic: PropTypes.bool,

   /**
    * @uxpindescription The location to display an icon, if one is set
    * @uxpinpropname Icon Position
    * */
   iconPosition: PropTypes.oneOf([posStart, posEnd]),

   /**
   * @uxpindescription Custom text displayed in the control. Note: Role must be set to 'Custom'.
   * @uxpinpropname C Text
   * */
   text: PropTypes.string,

   /**
    * @uxpindescription Custom icon to display. Note: Role must be set to 'Custom'.
    * @uxpinpropname C Icon Name
    * */
   iconName: PropTypes.string,

   /**
    * @uxpindescription Custom color for a custom icon. Use a color token or a standard Hex Color, such as '#0070BA', Note: Role must be set to 'Custom'.
    * @uxpinpropname C Icon Color
    * */
   iconColor: PropTypes.string,

   /**
    * @uxpindescription Tooltip for the control
    * @uxpinpropname Tooltip
    * */
   tooltip: PropTypes.string,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
StatusSet.defaultProps = {
   roleType: statusDefault,
   gutterPadding: defaultGutter,
   iconPosition: posStart,
   size: defaultSize,
   text: '',
   iconName: '',
   iconColor: '',
   bold: false,
   italic: false,
   tooltip: '',
};


export { StatusSet as default };