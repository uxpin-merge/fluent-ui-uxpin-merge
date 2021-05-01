import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SpinButton as FSpinButton } from '@fluentui/react/lib/SpinButton';



class SpinButton extends React.Component {
    constructor(props) {
        super(props);
    }

    set() {
        var s = '';
        if (this.props.suffix) {
            s = ' ' + this.props.suffix.trim();
        }
        let displayValue = this._getValidatedNumber(this.props.sbValue) + s;

        console.log("    set: " + displayValue);

        //Track the current numerical value within the control
        this.setState(
            { _currentValue: displayValue, }
        );

        //Sometimes the props aren't in sync with this display value. 
        if (this.props.sbValue !== displayValue)
            this.props.sbValue = displayValue;
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        console.log("comp did update. old: " + prevProps.sbValue + " new: " + this.props.sbValue);

        if (prevProps.sbValue !== this.props.sbValue) {

            console.log("    >>>> old: " + prevProps.sbValue + " new: " + this.props.sbValue);

            this.set();
        }
    }

    _hasSuffix(rawStr) {
        var success = false;

        if (this.props.suffix && rawStr) {
            let s = this.props.suffix.trim();
            success = rawStr.includes(s);
        }

        return success;
    }

    _removeSuffix(rawStr) {
        //We want the returned value to always be converted to a String
        var newValue = '';
        if (rawStr)
            newValue = rawStr.toString();

        if (this._hasSuffix(newValue)) {
            let s = this.props.suffix.trim();
            let index = newValue.indexOf(s);

            return newValue.substring(0, index);
        }

        //If we made it this far. we don't have a suffix. 
        return newValue;
    }

    /* 
    *  ************* UTILITY METHOD
    *  Validate the proposed new value to set in the control. 
    *  newValue: Should be a number, but might be a string or something else.   
    *  Returns a validated and cleansed numeric value.
    */
    _getValidatedNumber(newValue) {

        //Now, it's a String
        newValue = this._removeSuffix(newValue);

        if (!newValue
            || newValue.trim().length === 0
            || isNaN(+newValue)) {

            return '0';
        }

        else if (Number(newValue) > this.props.max)
            return this.props.max.toString();

        else if (Number(newValue) < this.props.min)
            return this.props.min.toString();

        return newValue;
    }

    /* 
    *  This event is fired when the user manually changes the value in the TextBox part of the control.
    *  This value comes in as a string. 
    **/
    _onValidate(newValue) {
        let n = this._getValidatedNumber(newValue);

        var s = '';
        if (this.props.suffix) {
            s = ' ' + this.props.suffix.trim();
        }

        console.log("on validate: " + n + s);

        return n + s;
    }

    /* 
    *  This event is fired when the user increments or decrements the value using the Up/Down Arrow buttons. 
    *  The old value comes in as a string. 
    *  We have to increment or decrement ourselves.
    *  This method calculates what the new value should be. 
    **/
    _onIncDec(oldValue, isIncrement) {
        // ************************
        // Validate and normalize the Value First
        let parsedVal = this._getValidatedNumber(oldValue);

        //Parse it back to a number
        let n = Number(parsedVal);

        //Prep the suffix
        var s = '';
        if (this.props.suffix) {
            s = ' ' + this.props.suffix.trim();
        }

        if (isIncrement) {
            //Add the step value
            //Validate that we haven't gone outside the bounds...
            let m = this._getValidatedNumber(n + this.props.step);
            console.log("on increment: " + m + s);
            return m + s;
        }

        //Subtract the step value
        //Validate that we haven't gone outside the bounds...
        let m = this._getValidatedNumber(n - this.props.step);
        console.log("on decrement: " + m + s);
        return m + s;
    }

    /* 
    *  Notify UXPin that the value has changed. 
    */
    _valueChanged() {

        console.log("_valueChanged event: " + this.props.sbValue);

        //Raise this event to UXPin. 
        if (this.props.onSBChange) {
            this.props.onSBChange(this.props.sbValue);
        }
    }


    render() {

        console.log("render: " + this.props.sbValue);

        return (

            <FSpinButton
                {...this.props}
                value={this.props.sbValue}

                onValidate={(v) => { this._onValidate(v); }}
                onIncrement={(v) => { this._onIncDec(v, true); }}
                onDecrement={(v) => { this._onIncDec(v, false); }}
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
    sbValue: PropTypes.number,

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
     * @uxpindescription A short string value to show after the number (Optional)
     * @uxpinpropname Suffix
     * */
    suffix: PropTypes.string,

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
    sbValue: '1',
    min: 0,
    max: 10,
    step: 1,
    title: '',
    suffix: '',
    disabled: false,
};


export { SpinButton as default };
