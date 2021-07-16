import * as React from 'react';
import * as PropTypes from 'prop-types';
import HorizontalStack from '../HorizontalStack/HorizontalStack';
import Persona from '../Persona/Persona';
import {
    PersonaSize,
    PersonaPresence
} from '@fluentui/react/lib/Persona';
import VerticalStack from '../VerticalStack/VerticalStack';
import { UxpPersonaData } from '../_helpers/uxppersonadata';



//This is the default URL to use for a generic female user
const defaultPersonaUrl = "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/person04.jpg";
const defaultSize = 'size72';



class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Handle the onClick handling for the Persona's email link and CommandBar buttons. 
     */
    _onClick(str) {
        //Raise this event to UXPin. We'll send them the button's index or email value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(str);
        }

        console.log("Persona click: " + str);
    }


    render() {

        let presenceCode = UxpPersonaData.presenceCodes[this.props.ppPresence];

        let imgURL = UxpImageUtils.getImageUrlByToken(this.props.imageUrl);

        return (

            <VerticalStack
                {...this.props}
                gutterPadding={12}
                align={'stretch'}
            >
                <Persona
                    {...this.props}
                    ppSize={PersonaSize[defaultSize]}
                    imageUrl={imgURL}
                    initials={this.props.initials}
                    ppPresence={presenceCode}
                    ppInitialsColor={this.props.ppInitialsColor}
                    name={this.props.name}
                    role={this.props.role}
                    tertiaryText={this.props.email}
                    onClick={() => this._onClick(0)}
                />

                <HorizontalStack>
                    {"Hello!"}
                </HorizontalStack>

            </VerticalStack>

            // <Stack
            //     styles={stackStyles}
            //     tokens={verticalGapStackTokens} >

            //     <StackItem align={'start'}>
            //         <Persona
            //             {...this.props}
            //             size={PersonaSize['size72']}
            //             presence={PersonaPresence[this.props.ppPresence]}
            //             initialsColor={this.props.ppInitialsColor}
            //             styles={personaStyles}

            //             //We can set these props as-is
            //             imageUrl={this.props.imageUrl}
            //             imageInitials={this.props.initials}
            //             text={this.props.name}
            //             secondaryText={this.props.role}
            //             tertiaryText={this.props.email}
            //             onClick={() => this._onClick(0)} //Always send 0
            //         />
            //     </StackItem>

            //     {this.state.showCommandBar && (
            //         <StackItem align={'start'}>
            //             <CommandBar
            //                 items={this.state.items}
            //                 styles={cbStyles}
            //             />
            //         </StackItem>
            //     )}
            // </Stack>

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ProfileCard.propTypes = {

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
    imageUrl: PropTypes.string,

    /**
     * Requires a proprietary prop name, or else things get screwy. 
     * @uxpindescription The user's presence status 
     * @uxpinpropname Presence
     */
    ppPresence: PropTypes.oneOf(['none', 'online', 'offline', 'away', 'busy', 'dnd', 'blocked']),

    /**
     * Requires a proprietary PayPal prop name, or else things get screwy   
     * @uxpindescription If no image, the color of the 'coin' showing the user's initials 
     * @uxpinpropname Initials Color
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
     * @uxpindescription This persona's email address
     * @uxpinpropname Email
     */
    email: PropTypes.string,

    /**
     * @uxpindescription Fires when th Persona component is clicked on
     * @uxpinpropname  Click Persona
     * */
    onPersonaClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
ProfileCard.defaultProps = {
    imageUrl: defaultPersonaUrl,
    initials: 'SCPC',
    name: 'Sydney Coleman PC',
    role: 'Financial Analyst II PC',
    email: 'alindqvist_pc@paypal.com',
    ppPresence: 'online',
    ppInitialsColor: 'lightBlue',
}


export { ProfileCard as default };