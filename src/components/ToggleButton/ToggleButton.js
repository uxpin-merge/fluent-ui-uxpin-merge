import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActionButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';



const defaultCheckedIcon = 'FavoriteStarFill';
const defaultCheckedText = 'Favorited';

const defaultUncheckedIcon = 'FavoriteStar';
const defaultUncheckedText = 'Favorite';



class ToggleButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
        }
    }

    set() {
        this.setState(
            { isChecked: this.props.isChecked }
        );
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.isChecked !== this.props.isChecked
        ) {
            this.set();
        }
    }

    _onChange() {
        //Toggle the state.
        let newIsCheckedStatus = !this.state.isChecked;
        this.setState(
            { isChecked: newIsCheckedStatus, }
        );

        //Raise this event to UXPin. We'll send them the new fave status in case they can catch it.
        if (this.props.onCheckChange) {
            this.props.onCheckChange(newIsCheckedStatus);
        }
    }


    render() {

        let text = this.state.isChecked ? this.props.checkedText : this.props.text;

        var iName = this.state.isChecked ? this.props.checkedIconName : this.props.iconName;
        if (iName)
            iName = iName.trim();

        let iconProps = { iconName: iName }

        //We want the root's margin to help the control to equal 40px. We need to make up 14px when there is no text.
        var rootPadding = '0 7px';
        //The label margin is always present, even when there is no label
        var labelMargin = '0';
        if (this.props.text || this.props.checkedText) {
            rootPadding = '0';
            labelMargin = '0 8px';
        }

        let styles = {
            root: {
                margin: 0,
                padding: rootPadding,
            },
            label: {
                whiteSpace: 'nowrap',
                margin: labelMargin,
                padding: 0,
            }
        }

        const tooltipId = _.uniqueId('tooltip_');

        return (
            <div>
                <TooltipHost
                    content={this.state.isChecked ? this.props.checkedTooltip : this.props.uncheckedTootlip}
                    id={tooltipId}
                >
                    <ActionButton
                        {...this.props}
                        text={text}
                        iconProps={iconProps}
                        styles={styles}
                        onClick={() => { this._onChange() }}
                        aria-describedby={tooltipId}
                    />
                </TooltipHost >
            </div>
        );
    }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ToggleButton.propTypes = {

    /**
     * @uxpindescription To toggle the Favorited state. This prop's live value is available for scripting.
     * @uxpinpropname * Is Checked
     * @uxpinbind onCheckChange
     * */
    isChecked: PropTypes.bool,

    /**
     * @uxpindescription Unchecked State: The text to display on the button
     * @uxpinpropname Text
     * */
    text: PropTypes.string,

    /**
     * @uxpindescription Checked State: The exact name from the icon library (Optional)
     * @uxpinpropname Icon Name
     * */
    iconName: PropTypes.string,

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Tooltip
     * */
    uncheckedTootlip: PropTypes.string,

    /**
     * @uxpindescription Checked State: The text to display on the button
     * @uxpinpropname Checked Text
     * */
    checkedText: PropTypes.string,

    /**
     * @uxpindescription Checked State: The exact name from the icon library (Optional)
     * @uxpinpropname Checked Icon Name
     * */
    checkedIconName: PropTypes.string,

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Checked Tooltip
     * */
    checkedTooltip: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control's Is Checked value changes.
     * @uxpinpropname * Check Changed
     * */
    onCheckChange: PropTypes.func
};



/**
 * Set the default values for this control in the UXPin Editor.
 */
ToggleButton.defaultProps = {
    isChecked: false,
    text: defaultUncheckedText,
    iconName: defaultUncheckedIcon,
    checkedText: defaultCheckedText,
    checkedIconName: defaultCheckedIcon,
    disabled: false,
    checkedTooltip: '',
    uncheckedTootlip: ''
};

export { ToggleButton as default };
