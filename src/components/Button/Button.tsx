import React from 'react';
import { PrimaryButton as PrimaryButtonM, DefaultButton as DefaultButtonM} from '@fluentui/react/lib/Button';



function Button(props: ButtonProps) {
  if (props.primary === true) {
    return (
      <PrimaryButtonM {...props} onClick={props.onClick}
        {props.text}
      />
    );
  }
  else {
    return (
      <DefaultButtonM {...props} onClick={props.onClick}
        {props.text}
      />
    );
  }
}




/**
 * Set up the properties to be available in the UXPin property inspector.
 */
export interface ButtonProps {
  /**
  * @uxpindescription The displayed text on the button
  * @uxpinpropname Text
  * */
  text: string;

  /**
   * @uxpindescription The exact name from the icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: string,

  /**
   * @uxpindescription The location to display an icon, if one is set
   * @uxpinpropname Icon Position
   * */
   iconPosition: 'start' | 'end',

  /**
   * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
   primary: boolean,

  /**
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
   tooltip: string,

   /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: boolean,

  /**
   * @uxpindescription Fires when the button is clicked on.
   * @uxpinpropname Click
   * */
  onClick(): void,
}

Button.defaultProps = {
  text: "Hello Hello!",
  primary: true,
  iconName: "",
  iconPosition: "start",
  tooltip: "Yes please TT",
  disabled: false,
};

export { Button as default };
