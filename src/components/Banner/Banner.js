import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import ActionButton from '../ActionButton/ActionButton';
import { Image } from '@fluentui/react/lib/Image';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';
import { UxpImageUtils } from '../_helpers/uxpimageutils';
import { UxpStatus } from '../_helpers/uxpstatus';



const defaultIconSize = 75;
const defaultBorderThickness = 1;
const defaultBorderLineStyle = 'solid';
const defaultRadius = 5;

const textHeadingSize = 'large';
const textBodySize = 'medium';
const stretch = 'stretch';
const vertAlign = 'start';

const statusDefault = 'info';
const statusCustom = 'custom image';
const statusList = [
   'info', 'success', 'done', 'ok', 'good', 'ready', 'passed', 'completed', 'approved', 'warning', 'error', 'failed', 'offline', 'pending', 'validating', 'skipped', 'unknown', 'blocked', 'syncing', 'inProgress', 'queued', 'waiting', 'currentStep', 'futureStep', 'scheduled', 'reverted', 'restored', statusCustom
];

const outerStackTokens = {
   childrenGap: 24,
   padding: 24,
};
const contentsStackTokens = {
   childrenGap: 6,
   padding: 0,
};



class Banner extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
      }
   }

   _onDismissClicked() {
      //Raise this event to UXPin. 
      if (this.props.onDismissClick) {
         this.props.onDismissClick();
      }
   }

   render() {

      //****************  Setup Icon or Image  ****************

      //Are we using a custom image or one of the built in icons?
      let isCustom = this.props.roleType === statusCustom ? true : false;

      //Set defaults to icon specs
      var icnName = UxpStatus.info.icon;
      var icnColor = UxpStatus.info.iconColor;
      var icnSize = this.props.size > -1 ? this.props.size : defaultIconSize;

      var iconOrImg = '';

      if (isCustom) {
         icnName = UxpImageUtils.getImageUrlByToken(this.props.imageUrl);

         let imgProps = {
            shouldFadeIn: true,
            src: icnName ? icnName : '',
            imageFit: 'center cover',
            maximizeFrame: true,
            width: icnSize,
            height: icnSize,
         }

         iconOrImg = (
            <Image
               {...imgProps}
            />
         );
      }
      else {
         iconOrImg = (
            <Icon
               iconName={icnName}
               color={icnColor}
               size={icnSize}
            />
         );
      }

      //****************  Setup Background & Border  ****************

      //Let's see if the user entered a valid color value. This method returns undefined if not. 
      var color = UxpStatus.getBackgroundColorByRole(this.props.roleType);
      var bColor = UxpStatus.getBorderColorByRole(this.props.roleType);

      if (isCustom) {
         color = UxpColors.getHexFromHexOrToken(this.props.bgColor);
         bColor = UxpColors.getHexFromHexOrToken(this.props.borderColor);
      }
      if (!color) {
         color = 'transparent';
      }

      //The function returns undefined if it's unparseable
      var thickness = defaultBorderThickness;

      if (!bColor) {
         thickness = 0;
         bColor = 'transparent';
      }
      let bStyle = thickness + 'px ' + defaultBorderLineStyle + ' ' + bColor;

      const topStackItemStyles = {
         root: {
            display: 'flex',
            overflow: 'hidden',
            borderRadius: defaultRadius,
            background: color,
            border: bStyle,
         },
      };

      //****************  Setup Text Contents & Children  ****************

      //To hold the list of contents
      var coList = [];

      //Add the title
      if (this.props.title && this.props.title?.trim()?.length > 0) {
         coList.push(
            <StackItem
               align={stretch}
               grow={false}>
               <Text
                  textValue={this.props.title.trim()}
                  size={textHeadingSize} />
            </StackItem>
         );
      }

      //Add the message
      if (this.props.text && this.props.text?.trim()?.length > 0) {
         coList.push(
            <StackItem
               align={stretch}
               grow={false}>
               <Text
                  textValue={this.props.text.trim()}
                  size={textBodySize} />
            </StackItem>
         );
      }

      if (this.props.children) {

         //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
         let childList = React.Children.toArray(this.props.children);

         if (childList.length && childList.length > 1) {

            //Let's assemble the list of additional things to put in the content area
            var i;
            for (i = 0; i < childList.length; i++) {
               let child = childList[i];
               coList.push(
                  <StackItem
                     align={stretch}
                     grow={false}>
                     {child}
                  </StackItem>
               );
            }
         }
      }

      //Create the stack of objects
      let mainContents = (
         <Stack
            tokens={contentsStackTokens}
            horizontal={false}
            wrap={false}
            horizontalAlign={stretch}
            verticalAlign={vertAlign}
         >
            {coList}
         </Stack>
      )

      return (

         <Stack
            {...this.props}
            tokens={outerStackTokens}
            horizontal={true}
            horizontalAlign={'start'}
            verticalAlign={'start'}
            wrap={false}
            styles={topStackItemStyles}>

            <StackItem
               verticalAlign={vertAlign}
            >
               {iconOrImg}
            </StackItem>

            <StackItem
               align={stretch}
               grow={3}
            >
               {coList}
            </StackItem>

            <StackItem>
               <ActionButton
                  iconName="ChromeClose"
                  tooltip="Close"
                  text=''
                  onClick={() => this._onDismissClicked()}
               />
            </StackItem>


         </Stack>
      );
   }
};


/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Banner.propTypes = {
   /**
    * @uxpindescription The control's title text
    * @uxpinpropname Headline
    */
   title: PropTypes.string,

   /**
    * @uxpindescription The main message text
    * @uxpincontroltype textfield(6)
    */
   text: PropTypes.string,

   /**
    * @uxpindescription Reflect the control's role in the UI with its icon and color. Set it to 'Custom" to set a custom image, background and border color.
    * @uxpinpropname Role
    * */
   roleType: PropTypes.oneOf(statusList),

   /**
   * @uxpindescription The size to use for the icon or image's width and height
   * @uxpinpropname Icon/Img Size
   * */
   size: PropTypes.number,

   /**
   * @uxpindescription The URL to an image file. 
   * Be sure the Img Token is set to 'custom image'!
   * Must start with 'www' or 'http'.
   * Supports the full list of image tokens, too.
   * @uxpinpropname Custom Img URL
   * @uxpincontroltype textfield(6)
   */
   imageUrl: PropTypes.string,

   /**
    * @uxpindescription Use a UI color token, hex or gradient value, such as 'themePrimary', 'black','#0070BA','linear-gradient(120deg, #8D7749, #498D77)' or 'radial-gradient(#8D3749, #37EE77)'.
    * @uxpinpropname Custom Background
    * */
   bgColor: PropTypes.string,

   /**
    * @uxpindescription Use a color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
    * @uxpinpropname Custom Border Color
    * */
   borderColor: PropTypes.string,

   /**
    * @uxpindescription The radius of the border line, if specified. PayPal UI typically uses 4 for rounded corners.
    * @uxpinpropname Border Radius
    */
   borderRadius: PropTypes.number,

   /**
    * @uxpindescription Fires when the control is clicked on.
    * @uxpinpropname Dismiss
    * */
   onDismissClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Banner.defaultProps = {
   roleType: statusDefault,
   title: "Banner",
   text: "This is an immersive notification banner.",
   size: defaultIconSize,
   borderRadius: defaultRadius,
};


export { Banner as default };