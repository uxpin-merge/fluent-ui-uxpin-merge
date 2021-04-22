import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DatePicker as FDatePicker } from '@fluentui/react/lib/DatePicker';
import {
    DayOfWeek,
    DateRangeType
} from '@fluentui/react/lib/Calendar';
import { UxpDateTimeUtils } from '../_helpers/uxpdatetimeutils.js';



const dayPickerStrings = {
    months: UxpDateTimeUtils.months,
    shortMonths: UxpDateTimeUtils.monthsShort,
    days: UxpDateTimeUtils.days,
    shortDays: UxpDateTimeUtils.daysShort,
    goToToday: 'Go to Today',
    weekNumberFormatString: 'Week {0}',
    invalidInputErrorMessage: 'Invalid date format.',
};

const workWeekDays = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday
];



class DatePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null //null or a Date
        }
    }

    set() {
        //Let's see if we can parse a real date
        var dt = UxpDateTimeUtils.parseDate(this.props.calDate);

        console.log("set. parsed date: " + dt);

        //If it doesn't come back as undefined, then we can use it. 
        if (dt) {
            dt = new Date(dt);
        }
        else {
            //If it's not a real date, then 'null' is the preferred value.
            dt = null;
        }

        this.setState(
            { selectedDate: dt }
        )
    }

    componentDidMount() {
        console.log("comp did mount");
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.calDate !== this.props.calDate) {
            console.log("comp did update");
            //this.set();
        }
    }


    /**
     * We'll immediately use the date. In the future, we may use the date range, too. 
     * @param {*} date - The selected date
     */
    _onChange(date) {

        this.setState(
            { selectedDate: date }
        )

        if (this.props.onChange) {
            //Format this before surfacing with style: 'Feb 8, 2020' 
            let dt = UxpDateTimeUtils.getFormattedDate(date);
            console.log("onchange: " + dt);
            this.props.onChange(dt);
        }
    }


    /**
     * A callback to format the date in our opinionated way
     * @param {*} dateStr 
     */
    _onFormatDate(dateStr) {
        let dt = UxpDateTimeUtils.getFormattedDate(dateStr);
        console.log("on format date: " + dt);
        return dt;
    }

    /**
     * A callback to parse the user's entry to see if it's a date
     * @param {*} str - The string the user entered which might be a date
     */
    _onParseDate(str) {
        let dt = UxpDateTimeUtils.parseDate(str);
        console.log('on parse date ' + dt);
        return dt;
    }


    render() {

        let calProps = {
            dateRangeType: DateRangeType.Day,  //Typically, we're looking for a day rather than a month or week
            autoNavigateOnSelection: true,
            showNavigateButtons: true,
            isDayPickerVisible: true,
            showSixWeeksByDefault: true,
            workWeekDays: workWeekDays,
        };

        return (

            <FDatePicker
                {...this.props}

                //Standard behaviors for this control
                firstDayOfWeek={DayOfWeek.Sunday}
                strings={dayPickerStrings}
                disableAutoFocus={true}
                highlightCurrentMonth={true}
                highlightSelectedMonth={true}
                isMonthPickerVisible={true}
                showCloseButton={true}
                showGoToToday={true}
                showMonthPickerAsOverlay={true}

                calendarProps={calProps}

                //From UXPin Props & State
                label={this.props.label}
                value={this.state.selectedDate}
                placeholder={this.props.placeholder}
                initialPickerDate={this.state.selectedDate}
                allowTextInput={this.props.allowTextInput}
                showWeekNumbers={this.props.showWeekNumbers}
                disabled={this.props.disabled}
                isRequired={this.props.required}

                onSelectDate={(d, sdr) => this._onChange(d)}
                formatDate={(d) => this._onFormatDate(d)}
                // onFormatDate={(d) => this._onFormatDate(d)}
                parseDateFromString={(d) => this._onParseDate(d)}
            />
        );
    }
}



DatePicker.propTypes = {

    /**
     * @uxpindescription The label for the switch
     * @uxpinpropname Label
     * @uxpincontroltype textfield(2)
     * */
    label: PropTypes.string,

    /**
     * A unique name for this property. We get weird behavior when using the same name as the control's prop. 
     * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020. This prop's live value is available for scripting.
     * @uxpinpropname * Date
     * @uxpinbind onChange
     */
    calDate: PropTypes.string,

    /**
     * @uxpindescription Placeholder text to show in the text field when it's empty
     * @uxpinpropname Placeholder
     * */
    placeholder: PropTypes.string,

    /**
     * @uxpindescription To allow the user to enter a date into the field
     * @uxpinpropname Allow Text Input
     * */
    allowTextInput: PropTypes.bool,

    /**
     * @uxpindescription To display week numbers on the left side of the Calendar
     * @uxpinpropname Show Week Numbers
     */
    showWeekNumbers: PropTypes.bool,

    /**
     * @uxpindescription To display the 'required' flag on the label
     * */
    required: PropTypes.bool,

    /**
     * @uxpindescription Fires when the selected date value changes.
     * @uxpinpropname * Date Changed
     */
    onChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
DatePicker.defaultProps = {
    label: "Basic DatePicker",
    placeholder: "Enter date: Jul 15, 2021 or 7/15/2021",
    calDate: "",
    allowTextInput: true,
    required: false,
    showWeekNumbers: false,
};


export { DatePicker as default };
