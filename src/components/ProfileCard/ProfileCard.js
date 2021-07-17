import * as React from 'react';
import * as PropTypes from 'prop-types';
import HorizontalStack from '../HorizontalStack/HorizontalStack';
import Link from '../Link/Link';
import Persona from '../Persona/Persona';
import { PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack } from '@fluentui/react/lib/Stack';
import { UxpImageUtils } from '../_helpers/uxpimageutils';
import { UxpPersonaData } from '../_helpers/uxppersonadata';



//For the Stack
const stackVAlign = 'start';
const stackHAlign = 'stretch';
const stackItemStyles = {
    root: {
        height: 'auto',
        width: 'auto',
    },
};
const stackTokens = {
    childrenGap: '12px',
    padding: 0,
};

//This is the default URL to use for a generic female user
const defaultPersonaUrl = "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/person04.jpg";
const defaultSize = 'size72';
const cmdBarHAlign = 'left';
const cmdBarVAlign = 'middle';



class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let presenceCode = UxpPersonaData.presenceCodes[this.props.ppPresence];

        var imgURL = UxpImageUtils.getImageUrlByToken(this.props.imageUrl);
        imgURL = imgURL ? imgURL : '';

        var commandBar = '';
        if (this.props.children) {
            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            commandBar = (
                <HorizontalStack
                    {...this.props}
                    gutterPadding={6}
                    widths={""}
                    addSpanner={false}
                    align={cmdBarHAlign}
                    vAlign={cmdBarVAlign}>
                    {childList}
                </HorizontalStack>
            );
        }

        return (

            <Stack
                tokens={stackTokens}
                horizontal={false}
                horizontalAlign={stackHAlign}
                verticalAlign={stackVAlign}
                wrap={false}
                styles={stackItemStyles}>

                <Persona
                    {...this.props}
                    size={PersonaSize[this.props.ppSize]}
                    imageUrl={imgURL}
                    initials={this.props.initials}
                    presence={presenceCode}
                    ppInitialsColor={this.props.ppInitialsColor}
                    name={this.props.name}
                    role={this.props.role}
                    status={""}
                    optional={""}
                    email={this.props.email}
                />

                {commandBar}

            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ProfileCard.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the body of the control. 
     * @uxpinpropname Children
     */
    children: PropTypes.node,

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
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
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
ProfileCard.defaultProps = {
    imageUrl: defaultPersonaUrl,
    initials: 'SC',
    name: 'Sydney Coleman',
    role: 'Financial Analyst II',
    email: 'scoleman@company.com',
    ppSize: defaultSize,
    ppPresence: 'none',
    ppInitialsColor: 'lightBlue',
}


export { ProfileCard as default };