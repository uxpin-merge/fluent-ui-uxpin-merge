import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Calendar as FCalendar, DayOfWeek, DateRangeType } from '@fluentui/react/lib/Calendar';
import { UxpDateTimeUtils } from '../_helpers/uxpdatetimeutils';




/**
 * UPDATED April 8, 2020 by Anthony Hand
 * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
 * - Converted object to a class.
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Apply the PayPal UI theme 
 * 
 * */



const dayPickerStrings = {
    months: UxpDateTimeUtils.months,
    shortMonths: UxpDateTimeUtils.monthsShort,
    days: UxpDateTimeUtils.days,
    shortDays: UxpDateTimeUtils.daysShort,
    goToToday: 'Go to Today',
    weekNumberFormatString: 'Week {0}',
};

const workWeekDays = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday
];


class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null //null or a Date
        }
    }

    set() {
        let dt = this._parseDate(this.props.uxpValue);

        console.log("set dt: " + dt);

        this.setState(
            { selectedDate: dt }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.uxpValue !== this.props.uxpValue) {
            this.set();
        }
    }

    //Based on the prop for the current date value, returns a valid Date object. 
    _parseDate(dateStr) {

        //Let's see if we can parse a real date
        let dt = UxpDateTimeUtils.parseDate(dateStr);

        console.log("parse date. dt: " + dt);

        //If it doesn't come back as undefined, then we can use it. 
        if (dt) {
            return new Date(dt);
        }
        else {
            //If it's undefined, then let's just return right now.
            return new Date();
        }
    }

    //We'll immediately use the date. In the future, we may use the date range, too. 
    _onChange(date) {

        this.setState(
            { selectedDate: date }
        )

        if (this.props.onChange) {
            //Format this before surfacing with style: 'Feb 8, 2020' 
            let dt = UxpDateTimeUtils.getFormattedDate(date);

            console.log("onChange. dt: " + dt);

            this.props.onChange(dt);
        }
    }


    render() {

        let dt = this.state.selectedDate;
        console.log("render. dt: " + dt);

        return (

            <FCalendar
                {...this.props}
                value={dt}
                isMonthPickerVisible={true}
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={true}
                showGoToToday={true}
                showNavigateButtons={true}
                highlightCurrentMonth={true}
                highlightSelectedMonth={true}
                isDayPickerVisible={true}
                showMonthPickerAsOverlay={true}
                showSixWeeksByDefault={true}
                firstDayOfWeek={DayOfWeek.Sunday}
                workWeekDays={workWeekDays}
                strings={dayPickerStrings}
                onSelectDate={(d, sdr) => this._onChange(d)}
            />
        );
    }
}



Calendar.propTypes = {

    /**
     * A unique name for this property. Got some weird behavior with the same name as the control's prop. 
     * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020. This prop's live value is available for scripting.
     * @uxpinpropname * Date
     * @uxpinbind onChange
     */
    uxpValue: PropTypes.string,

    /**
     * @uxpindescription To display week numbers on the left side of the Calendar
     * @uxpinpropname Show Week Numbers
     */
    showWeekNumbers: PropTypes.bool,

    /**
     * @uxpindescription Fires when the selected date value changes.
     * @uxpinpropname * Date Changed
     */
    onChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Calendar.defaultProps = {
    uxpValue: "Jun 15, 2021",
    showWeekNumbers: false,
};


export { Calendar as default };
