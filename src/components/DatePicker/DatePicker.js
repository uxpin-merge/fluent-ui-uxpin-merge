import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DatePicker as FDatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek, DateRangeType } from '@fluentui/react/lib/DateTimeUtilities'
import { UxpDateTimeUtils } from '../_helpers/uxpdatetimeutils';



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

    //This control wants a real Date object or null. 
    this.state = {
      selectedDate: ''
    }
  }

  set() {
    //Let's see if we can parse a real date
    let dt = UxpDateTimeUtils.parseDate(this.props.calDate);

    this.setState(
      { selectedDate: dt ? dt : '' }
    )
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.calDate !== this.props.calDate) {
      this.set();
    }
  }

  _onChange(date) {

    this.setState(
      { selectedDate: date }
    )

    if (this.props.onChange) {
      //Format this before surfacing with style: 'Feb 8, 2020' 
      let dt = UxpDateTimeUtils.getFormattedDate(date);

      console.log("returning changed date: " + dt);

      this.props.onChange(dt ? dt : ' ');
    }
  }


  /**
   * A callback to format the date as in our preferred way
   * @param {*} dateStr 
   */
  _onFormatDate(dateStr) {
    let dt = UxpDateTimeUtils.getFormattedDate(dateStr);
    return dt ? dt : '';
  }

  /**
   * A callback to parse the user's entry to see if it's a date
   * @param {*} str - The string the user entered which might be a date
   */
  _onParseDate(str) {
    let dt = UxpDateTimeUtils.parseDate(str);
    return dt ? dt : '';
  }


  render() {

    const calProps = {
      dateRangeType: DateRangeType.Day,
      autoNavigateOnSelection: true,
      showNavigateButtons: true,
      isDayPickerVisible: true,
      showSixWeeksByDefault: true,
      workWeekDays: workWeekDays,
    };

    let dt = this.state.selectedDate ? this.state.selectedDate : new Date();

    return (

      <FDatePicker
        {...this.props}

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

        label={this.props.label}
        value={this.state.selectedDate}
        placeholder={this.props.placeholder}
        initialPickerDate={dt}
        allowTextInput={this.props.allowTextInput}
        showWeekNumbers={this.props.showWeekNumbers}
        disabled={this.props.disabled}
        isRequired={this.props.required}

        onSelectDate={(d, sdr) => this._onChange(d)}
        onFormatDate={(d) => this._onFormatDate(d)}
        parseDateFromString={(d) => this._onParseDate(d)}
      />
    );
  }
};


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
DatePicker.propTypes = {

  /**
   * @uxpindescription The label for the control
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * A unique name for this property. Got some weird behavior with the same name as the control's prop. 
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
  label: "DatePicker",
  placeholder: "Enter date: Jan 15, 2021 or 1/15/2021",
  calDate: "",
  allowTextInput: true,
  required: false,
  showWeekNumbers: false,
};


export { DatePicker as default };
