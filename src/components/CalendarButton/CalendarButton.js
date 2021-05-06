import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Calendar, DayOfWeek, DateRangeType } from '@fluentui/react/lib/Calendar';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { PrimaryButton, DefaultButton, ActionButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { UxpDateTimeUtils } from '../_helpers/uxpdatetimeutils';



const btnAction = 'Action';
const btnPrimary = 'Primary';
const btnSecondary = 'Secondary';


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


class CalendarButton extends React.Component {
    constructor(props) {
        super(props);

        let dt = new Date();

        this.state = {
            selectedDate: dt,
            showCalendar: false,
            userSelected: false,
        }

        this._calendarButtonElement = React.createRef();
    }

    componentDidMount() {
        //Let's see if we can parse a real date
        var dt = UxpDateTimeUtils.parseDate(this.props.calDate);
        dt = dt ? dt : new Date();

        this.setState(
            { selectedDate: dt }
        )
    }

    _onButtonClick() {
        this.setState(
            { showCalendar: true }
        )

        if (this.onButtonClick) {
            this.onButtonClick();
        }
    }

    _onChange(date) {
        this.setState(
            {
                selectedDate: date,
                showCalendar: false,
                userSelected: true
            }
        )

        if (this.props.onChange) {
            //Format this before surfacing with style: 'Feb 8, 2020' 
            let dt = UxpDateTimeUtils.getFormattedDate(date);
            this.props.onChange(dt);
        }
    }

    _onDismissCallout() {
        this.setState(
            { showCalendar: false }
        )
    }

    render() {
        let buttonIconProps = { iconName: this.props.buttonIcon }

        //We use the text the UXPin user set for the button unless the user has selected a date
        var buttonText = this.props.buttonText;
        if (this.props.showSelectedDate && this.state.selectedDate && this.state.userSelected) {
            buttonText = UxpDateTimeUtils.getFormattedDate(this.state.selectedDate);
        }

        let selectedDate = this.state.selectedDate ? this.state.selectedDate : new Date();

        const tooltipId = _.uniqueId('tooltip_');

        return (
            <TooltipHost
                content={this.props.tooltip}
                id={tooltipId}
            >

                <div ref={this._calendarButtonElement}>
                    {this.props.buttonType == btnAction ?
                        <ActionButton
                            {...this.props}
                            iconProps={buttonIconProps}
                            text={buttonText}
                            disabled={this.props.buttonDisabled}
                            onClick={() => { this._onButtonClick() }}
                            aria-describedby={tooltipId}
                        />
                        : this.props.buttonType == btnPrimary ?
                            <PrimaryButton
                                {...this.props}
                                iconProps={buttonIconProps}
                                text={buttonText}
                                disabled={this.props.buttonDisabled}
                                styles={buttonStyles}
                                onClick={() => { this._onButtonClick() }}
                                aria-describedby={tooltipId}
                            />
                            :
                            <DefaultButton
                                {...this.props}
                                iconProps={buttonIconProps}
                                text={buttonText}
                                disabled={this.props.buttonDisabled}
                                styles={buttonStyles}
                                onClick={() => { this._onButtonClick() }}
                                aria-describedby={tooltipId}
                            />
                    }
                </div>
                {this.state.showCalendar && (
                    <Callout
                        isBeakVisible={false}
                        gapSpace={0}
                        doNotLayer={false}
                        target={this._calendarButtonElement}
                        directionalHint={DirectionalHint.bottomLeftEdge}
                        onDismiss={() => { this._onDismissCallout() }}
                        setInitialFocus={true}
                    >
                        <FocusTrapZone isClickableOutsideFocusTrap={true}>
                            <Calendar
                                value={selectedDate}
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
                                showWeekNumbers={this.props.showWeekNumbers}
                                onSelectDate={(d, sdr) => this._onChange(d)}
                            />
                        </FocusTrapZone>
                    </Callout>
                )}
            </TooltipHost>

        );
    }

}

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CalendarButton.propTypes = {

    /**
     * @uxpindescription Reflect the control's role in the UI with its visual style
     * @uxpinpropname Button Type
     * */
    buttonType: PropTypes.oneOf([btnAction, btnPrimary, btnSecondary]),

    /**
     * @uxpindescription The displayed text on the button (Optional)
     * @uxpinpropname Button Text
     * */
    buttonText: PropTypes.string,

    /**
     * @uxpindescription The exact name from the icon library (Optional)
     * @uxpinpropname Button Icon Name
     * */
    buttonIcon: PropTypes.string,

    /**
     * A unique name for this property. Got some weird behavior with the same name as the control's prop. 
     * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020. This prop's live value is available for scripting.
     * @uxpinpropname * Date
     * @uxpinbind onChange
     */
    calDate: PropTypes.string,

    /**
     * @uxpindescription To replace the default string on the button with the selected date  
     * @uxpinpropname Show Selected Date
     * */
    showSelectedDate: PropTypes.bool,

    /**
     * @uxpindescription To display week numbers on the left side of the Calendar
     * @uxpinpropname Show Week Numbers
     */
    showWeekNumbers: PropTypes.bool,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    buttonDisabled: PropTypes.bool,

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Tooltip
     * */
    tooltip: PropTypes.string,

    /**
     * @uxpindescription Fires when the selected date value changes.
     * @uxpinpropname * Date Changed
     */
    onChange: PropTypes.func,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
CalendarButton.defaultProps = {
    buttonType: btnAction,
    rounded: true,
    buttonDisabled: false,
    buttonText: 'Show Calendar',
    buttonIcon: 'Calendar',
    calDate: "Jul 1, 2021",
    showSelectedDate: true,
    showWeekNumbers: false,
    tooltip: '',
};


export { CalendarButton as default };