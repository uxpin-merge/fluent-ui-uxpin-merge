import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SpinButton as FSpinButton } from '@fluentui/react/lib/SpinButton';



class SpinButton extends React.Component {
    constructor(props) {
        super(props);

        // //Track the checked state within the control
        // this.state = {
        //     _currentValue: '0',
        // }
    }

    // set() {
    //     var s = '';
    //     if (this.props.suffix) {
    //         s = ' ' + this.props.suffix.trim();
    //     }
    //     let displayValue = this._getValidatedNumber(this.props.sbValue) + s;

    //     console.log("    set: " + displayValue);

    //     //Track the current numerical value within the control
    //     this.setState(
    //         { _currentValue: displayValue, }
    //     );

    //     //Sometimes the props aren't in sync with this display value. 
    //     if (this.props.sbValue !== displayValue)
    //         this.props.sbValue = displayValue;
    // }

    // componentDidMount() {
    //     this.set();
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.sbValue !== this.props.sbValue) {
    //         this.set();
    //     }
    // }


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

        return (

            <FSpinButton
                {...this.props}
                defaultValue={this.props.value}
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
    value: '1',
    min: 0,
    max: 10,
    step: 1,
    title: '',
    disabled: false,
};


export { SpinButton as default };
