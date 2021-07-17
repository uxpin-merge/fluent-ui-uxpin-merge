import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from '../Link/Link';
import {
    Persona as FPersona,
    PersonaSize,
    PersonaInitialsColor
} from '@fluentui/react/lib/Persona';
import { UxpPersonaData } from '../_helpers/uxppersonadata';
import { UxpImageUtils } from '../_helpers/uxpimageutils';



//This is the image URL for Persona04
let defaultPersonaUrl = "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/person04.jpg"

//Fix the weird line height issue in the top line of the Persona
const personaStyles = {
    root: {
        lineHeight: '1.35',
    },
};



class Persona extends React.Component {

    constructor(props) {
        super(props);
    }

    _onClick() {

        //For the end user in UXPin, let's send the initials as a unique identifier, or full name if no initials have been set. 
        var returnValue = (this.props.initials || this.props.name || "persona");

        //Raise this event to UXPin. We'll send them the new index value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(returnValue);
        }
    }


    render() {

        let presenceCode = UxpPersonaData.presenceCodes[this.props.ppPresence];

        let imgURL = UxpImageUtils.getImageUrlByToken(this.props.imageUrl);

        var email = '';
        if (this.props.email && this.props?.email?.trim().length > 0) {

            let trimmedLink = this.props.email.trim();
            let link = trimmedLink.startsWith("mailto:") ? trimmedLink : 'mailto:' + trimmedLink;

            email = (
                <Link
                    {...this.props}
                    value={this.props.email}
                    linkHref={link ? link : ''}
                />
            );
        }

        return (
            <FPersona
                {...this.props}
                size={PersonaSize[this.props.ppSize]}
                presence={presenceCode}
                initialsColor={PersonaInitialsColor[this.props.ppInitialsColor]}
                imageUrl={imgURL}
                imageInitials={this.props.initials}
                text={this.props.name}
                secondaryText={this.props.role}
                tertiaryText={this.props.status}
                optionalText={this.props.optional}
                hidePersonaDetails={this.props.hidePersonaDetails}
                styles={personaStyles}
                onClick={() => { this._onClick() }}
                children={undefined}
            >
                {email}
            </FPersona>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Persona.propTypes = {

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. Supports the Image Tokens feature, such as 'person1', 'bridge', 'office', and 'dog'. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
    imageUrl: PropTypes.string,

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy. 
    * @uxpindescription The control's size 
    * @uxpinpropname Size
    */
    ppSize: PropTypes.oneOf(['size8', 'size24', 'size32', 'size40', 'size56', 'size72', 'size100']),

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy. 
    * @uxpindescription The user's presence status 
    * @uxpinpropname Presence
    */
    ppPresence: PropTypes.oneOf(['none', 'online', 'offline', 'away', 'busy', 'dnd', 'blocked']),

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy   
    * @uxpindescription If no image, the background color of the 'coin' showing the user's initials 
    * @uxpinpropname Coin Bg Color
    */
    ppInitialsColor: PropTypes.oneOf([
        'green', 'darkGreen', 'teal', 'lightBlue', 'blue', 'darkBlue', 'violet',
        'purple', 'magenta', 'lightPink', 'pink', 'burgundy', 'lightRed', 'darkRed',
        'orange', 'rust', 'gold', 'warmGray', 'coolGray']),

    /**
    * @uxpindescription If no image, the initials to display on the 'coin' 
    * @uxpinpropname Initials
    */
    initials: PropTypes.string,

    /**
    * @uxpindescription The full name for this persona 
    * @uxpinpropname Name
    */
    name: PropTypes.string,

    /**
    * @uxpindescription This persona's role; displayed under their name
    * @uxpinpropname Role
    */
    role: PropTypes.string,

    /**
    * @uxpindescription This persona's current availability status, such as 'In a meeting'
    * @uxpinpropname Status
    */
    status: PropTypes.string,

    /**
    * @uxpindescription In very large Personas, a 4th line of text can show more info, if desired
    * @uxpinpropname Additional Text
    */
    optional: PropTypes.string,

    /**
     * @uxpindescription This persona's email address
     * @uxpinpropname Email
     */
    email: PropTypes.string,

    /** 
    * @uxpindescription Whether to display the persona's details or only the 'coin'
    * @uxpinpropname Hide Details
    */
    hidePersonaDetails: PropTypes.bool,

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Persona.defaultProps = {
    imageUrl: '',
    initials: '',
    name: '',
    role: '',
    status: '',
    optional: '',
    ppSize: "size100",
    ppPresence: 'online',
    hidePersonaDetails: false,
    ppInitialsColor: 'lightBlue'
};


export { Persona as default };
