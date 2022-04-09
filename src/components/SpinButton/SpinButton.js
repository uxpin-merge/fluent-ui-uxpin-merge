import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SpinButton as FSpinButton } from '@fluentui/react/lib/SpinButton';
import { Position } from '@fluentui/react/lib/utilities/positioning';



const posTop = "top";
const posStart = "start";
const posEnd = "end";


class SpinButton extends React.Component {
    constructor(props) {
        super(props);
    }

    /* 
    *  Notify UXPin that the value has changed. 
    */
    _valueChanged(newValue) {
        //Raise this event to UXPin. 
        if (this.props.onSBChange) {
            this.props.onSBChange(newValue);
        }
    }

    render() {
        var labelIconProps = '';
        let icnName = this.props.iconName?.trim();
        console.log("icnName: " + icnName);

        if (icnName.length() > 0) {
            labelIconProps = { iconName: icnName };
            console.log("Yes, we should show a label icon");
        }

        // let iconProps = { iconName: this.props.iconName }

        let position = this.props.labelDisplay === posEnd ? Position.end :
            this.props.labelDisplay === posTop ? Position.top :
                Position.start;

        return (

            <FSpinButton
                {...this.props}
                defaultValue={this.props.value}
                labelPosition={position}
                iconProps={labelIconProps}
                onChange={(evt, v) => { this._valueChanged(v) }}
            />
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
SpinButton.propTypes = {

    /**
     * @uxpindescription Description label of the SpinButton
     * @uxpinpropname Label
     * @uxpincontroltype textfield(2)
     * */
    label: PropTypes.string,

    /**
     * @uxpindescription Whether the label appears on the left or on top
     * @uxpinpropname Position
     * */
    labelDisplay: PropTypes.oneOf([posStart, posTop, posEnd]),

    /**
     * @uxpindescription The numeric value of the SpinButton. This prop's live value is available for scripting.
     * @uxpinbind onSBChange
     * @uxpinpropname * Value
     * */
    value: PropTypes.number,

    /**
    * @uxpindescription The minimum value of the SpinButton
    * @uxpinpropname Min
    * */
    min: PropTypes.number,

    /**
    * @uxpindescription The maximum value of the SpinButton
    * @uxpinpropname Max
    * */
    max: PropTypes.number,

    /**
    * @uxpindescription The amount to raise or lower the value when clicking on the up or down buttons
    * @uxpinpropname Step
    * */
    step: PropTypes.number,

    /**
     * @uxpindescription The exact name from the Fluent icon library (Optional)
     * @uxpinpropname Icon Name
     * */
    iconName: PropTypes.string,

    /**
     * @uxpindescription A little tooltip that will display on hover
     * @uxpinpropname Tooltip
     * @uxpincontroltype textfield(2)
     * */
    title: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    disabled: PropTypes.bool,

    /**
    * @uxpindescription Fires when the control's Value property changes.
    * @uxpinpropname * Value Changed
    * */
    onSBChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
SpinButton.defaultProps = {
    label: 'Basic SpinButton',
    labelDisplay: posStart,
    value: '1',
    min: 0,
    max: 10,
    step: 1,
    title: '',
    iconName: '',
    disabled: false,
};


export { SpinButton as default };
