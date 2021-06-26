import React from 'react';
import * as PropTypes from 'prop-types';
import { Rating as FRating, RatingSize } from '@fluentui/react/lib/Rating';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';



//Self-imposed limits on the number of stars.
const minNumberOfStars = 1;
const maxNumberOfStars = 20;



class Rating extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            maxNumberOfStars: 5
        }
    }

    set() {
        //We have to do some error checking, just in case. 

        //Make sure that the user entered a number between 1 - max.
        let sCount = this.props.stars < minNumberOfStars ? minNumberOfStars
            : this.props.stars > maxNumberOfStars ? maxNumberOfStars
                : this.props.stars;

        let index = this.props.value < 0 ? 0
            : this.props.value > sCount ? sCount
                : this.props.value;

        this.setState(
            {
                selectedIndex: index,
                maxNumberOfStars: sCount,
            }
        )
    }


    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value
            || prevProps.stars !== this.props.stars) {
            this.set();
        }
    }

    _onChange(index) {

        //The index comes in 1-based so we can save it immediately.     
        this.setState(
            { selectedIndex: index }
        )

        //Raise this event to UXPin
        if (this.props.onValueChange) {
            this.props.onValueChange(index);
        }
    }


    render() {

        let index = this.state.selectedIndex;
        let stars = this.state.maxNumberOfStars;

        const ttTargetID = _.uniqueId('ttTarget_');
        const tooltipId = _.uniqueId('tooltip_');
        const ttProps = {
            gapSpace: 2,
            target: `#${ttTargetID}`,
        };

        return (
            <>
                <TooltipHost
                    content={this.props.tooltip}
                    id={tooltipID}
                    calloutProps={ttProps}
                >
                    <FRating
                        {...this.props}
                        rating={index}
                        max={stars}
                        allowZeroStars={true}
                        unselectedIcon={this.props.unselectedIcon.trim()}
                        icon={this.props.selectedIcon.trim()}
                        size={RatingSize[this.props.size]}
                        id={ttTargetID}
                        aria-describedby={tooltipID}
                        onChange={(e, v) => { this._onChange(v); }}
                    />
                </TooltipHost>
            </>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Rating.propTypes = {

    /**
     * @uxpindescription The rating value. This prop's live value is available for scripting.
     * @uxpinpropname * Value
     * @uxpinbind onValueChange
     */
    value: PropTypes.number,

    /**
    * @uxpindescription The number of stars to display, from 1 - 20
    */
    stars: PropTypes.number,

    /**
     * @uxpindescription The exact name from the PayPal icon library
     */
    unselectedIcon: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library
     */
    selectedIcon: PropTypes.string,

    /**
     * @uxpindescription The display size
     */
    size: PropTypes.oneOf([
        'Small',
        'Large',
    ]),

    /**
     * @uxpindescription Tooltip for the control
     * @uxpinpropname Tooltip
     * */
    tooltip: PropTypes.string,

    /**
     * @uxpindescription To disable the control
     * */
    disabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control's Value property changes.
     * @uxpinpropname * Value Changed
     * */
    onValueChange: PropTypes.func

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Rating.defaultProps = {
    value: 0,
    stars: 5,
    unselectedIcon: "FavoriteStar",
    selectedIcon: "FavoriteStarFill",
    size: 'Small',
    disabled: false
};

export { Rating as default };
