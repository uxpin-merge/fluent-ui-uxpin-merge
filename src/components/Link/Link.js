import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link as FLink } from '@fluentui/react/lib/Link';
import { Text } from '@fluentui/react/lib/Text';


class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    _onLinkClick() {

        if (this.props.disabled)
            return;

        //Raise this event to UXPin. We'll send them the HREF value in case they can catch it.
        if (this.props.onLinkClick) {
            this.props.onLinkClick(this.props.linkHref);
        }
    }


    render() {
        const linkTarget = "_UXPin Mockup";

        //We assemble the Link Text style next
        let linkTextStyles = {
            root: {
                fontWeight: this.props.bold ? 'bold' : 'normal',
                fontStyle: this.props.italic ? 'italic' : 'normal',
                display: 'block',         //Required - prevents a bug
                lineHeight: 'normal',     //Required - prevents a bug,
                textAlign: this.props.align,
            }
        };


        return (
            <Text
                {...this.props}
                styles={linkTextStyles}
                variant={this.props.size}>

                <FLink
                    {...this.props}
                    disabled={this.state.isDisabled}
                    href={this.props.linkHref}
                    target={linkTarget} //Force open in a new window
                    onClick={() => { this._onLinkClick() }}
                >

                    {this.props.value}

                </FLink>
            </Text >

        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Link.propTypes = {

    /**
     * @uxpindescription The text value to display
     * @uxpinpropname Link Text
     * @uxpincontroltype textfield(6)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription A valid href value for the link itself. It should start with "http://", "https://", or "mailto:"
     * @uxpinpropname href
     * @uxpincontroltype textfield(6)
     */
    linkHref: PropTypes.string,

    /**
     * @uxpindescription To apply bold formatting
     * @uxpinpropname Bold
     */
    bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Italic
     */
    italic: PropTypes.bool,

    /**
     * @uxpindescription Text alignment
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Size
     */
    size: PropTypes.oneOf([
        'tiny',
        'xSmall',
        'small',
        'smallPlus',
        'medium',
        'mediumPlus',
        'large',
        'xLarge',
        'xxLarge',
        'mega',
    ]),

    /**
     * @uxpindescription To disable the control
     * @uxpinpropname Disabled
     * */
    isDisabled: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     */
    onLinkClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Link.defaultProps = {
    value: 'UXPin.com',
    linkHref: 'https://www.uxpin.com',
    isDisabled: false,
    size: 'medium',
    bold: false,
    italic: false,
    align: 'left',
}


export { Link as default };