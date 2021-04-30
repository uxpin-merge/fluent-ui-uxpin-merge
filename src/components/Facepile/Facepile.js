import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Facepile as FFacepile,
    OverflowButtonType
} from '@fluentui/react/lib/Facepile';
import { HoverCard, HoverCardType, IPlainCardProps } from '@fluentui/react/lib/HoverCard';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { PersonaPresence } from '@fluentui/react/lib/PersonaPresence';
import { UxpPersonaData } from '../_helpers/uxppersonadata';



//The max count for the persona list 
const maxPersonaCount = 99;

const customPersonaStyles = {
    display: 'unset',
};

const customPersonaCoinDivStyles = {
    selectors: {
        '&hover': {
            cursor: 'pointer',
        },
    },
};



class Facepile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            personaList: []
        }
    }

    set() {
        //Make sure that the user entered a number between 1 - max.
        var pCount = this.props.number;
        if (this.props.number < 1) {
            pCount = 1;
        }
        if (this.props.number > maxPersonaCount) {
            pCount = maxPersonaCount;
        }

        let rawPersonas = UxpPersonaData.getPersonaList(pCount);
        var configuredPersonas = [];

        //Add the event handler
        var i;
        for (i = 0; i < rawPersonas.length; i++) {
            var persona = rawPersonas[i];
            // persona.onClick = ((e, p) => this._onClick(p));
            configuredPersonas.push(persona);
        }

        this.setState(
            { personaList: configuredPersonas }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.number !== this.props.number) {
            this.set();
        }
    }

    //Get the index of the persona that the user clicked on. 
    _getSelectedPersonaIndex(persona) {
        let selectedInitials = persona.text.toLowerCase().trim();

        var i;
        for (i = 0; i < this.state.personaList.length; i++) {
            let initials = this.state.personaList[i].text.toLowerCase().trim();
            if (initials === selectedInitials)
                return i + 1; //Use a 1-based index
        }
    }

    _onRenderCompactCard(personaProps) {
        console.log("_onRenderCompactCard: " + personaProps.text);

        return (
            <Persona
                {...personaProps}
                hidePersonaDetails={false}
                size={PersonaSize['size72']}
                imageUrl={personaProps.imageUrl}
                imageInitials={personaProps.imageInitials}
                initialsColor={personaProps.initialsColor}
                text={personaProps.text}
                secondaryText={personaProps.secondaryText}
                tertiaryText={personaProps.tertiaryText}
                optionalText={personaProps.optionalText}
                presence={PersonaPresence[personaProps.presence]}
                className={customPersonaStyles}
            />
        );
    }

    _onRenderPersonaCoin(personaProps) {
        console.log("_onRenderPersonaCoin: " + personaProps.text);
        // className={customPersonaCoinDivStyles}

        return (
            <div style={{ cursor: 'pointer' }} >

                <Persona
                    {...personaProps}
                    hidePersonaDetails={true}
                    size={PersonaSize[this.props.size]}
                    imageUrl={personaProps.imageUrl}
                    imageInitials={personaProps.imageInitials}
                    initialsColor={personaProps.initialsColor}
                    text={personaProps.text}
                    secondaryText={personaProps.secondaryText}
                    tertiaryText={personaProps.tertiaryText}
                    optionalText={personaProps.optionalText}
                    presence={PersonaPresence[personaProps.presence]}
                    className={customPersonaStyles}
                    onClick={() => { this._onClick(personaProps) }}
                />

            </div>

        );

    }

    _onRenderSinglePersona(personaProps) {
        console.log("_onRenderSinglePersona: " + personaProps.text);

        //Sizes 16 and 28 aren's supported in the Persona control.
        let pSize = this.props.size === 'size16' ? 'size24'
            : this.props.size === 'size28' ? 'size24'
                : this.props.size;

        console.log("_onRenderSinglePersona: pSize: " + pSize);

        return (
            <div style={{ cursor: 'pointer' }} >

                <Persona
                    {...personaProps}
                    hidePersonaDetails={true}
                    size={PersonaSize[pSize]}
                    imageUrl={personaProps.imageUrl}
                    imageInitials={personaProps.imageInitials}
                    initialsColor={personaProps.initialsColor}
                    text={personaProps.text}
                    secondaryText={personaProps.secondaryText}
                    tertiaryText={personaProps.tertiaryText}
                    optionalText={personaProps.optionalText}
                    presence={PersonaPresence[personaProps.presence]}
                    className={customPersonaStyles}
                    onClick={() => { this._onClick(personaProps) }}
                />

            </div>
        );

    }

    _onClickOverflow(event) {
        //Raise this event to UXPin. 
        if (this.props.onOverflowClick) {
            this.props.onOverflowClick();
        }
    }

    _onClickAddButton(event) {
        //Raise this event to UXPin. 
        if (this.props.onAddClick) {
            this.props.onAddClick();
        }
    }

    _onClick(persona) {
        console.log("_on click: " + persona.text)

        let index = this._getSelectedPersonaIndex(persona);

        console.log("_on click: p index: " + index);

        this.props.selectedIndex = index;

        //Raise this event to UXPin. 
        if (this.props.onClick) {
            this.props.onClick(index);
        }
    }


    render() {

        //Configure the Overflow button type. Off by default. 
        var ovbType = OverflowButtonType['none'];
        if (this.props.showOverflowButton) {
            ovbType = OverflowButtonType['descriptive'];
        }

        //Add the Overflow Button click listener. 
        const overflowButtonParams = {
            onClick: ((e) => this._onClickOverflow(e))
        };

        //Add the Add Button click listener. 
        const addButtonParams = {
            onClick: ((e) => this._onClickAddButton(e))
        };

        return (
            <FFacepile
                {...this.props}
                personaSize={PersonaSize[this.props.size]}
                maxDisplayablePersonas={this.props.faceCount}
                personas={this.state.personaList.slice(0, this.props.number)}

                onRenderPersona={(p) => this._onRenderSinglePersona(p)}
                onRenderPersonaCoin={(p) => this._onRenderPersonaCoin(p)}

                addButtonProps={addButtonParams}
                overflowButtonType={ovbType}
                overflowButtonProps={overflowButtonParams}
            />
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Facepile.propTypes = {

    /**
     * @uxpindescription Used only at runtime for scripting, returns the 1-based index of the face the user clicked on.
     * @uxpinbind onClick
     * @uxpinpropname * Selected Index
     * */
    selectedIndex: PropTypes.number,

    /**
    * @uxpindescription The maximum number of faces to display inline; the rest will go in the overflow, if shown. A value between 5-10 is recommended.
    * @uxpinpropname Inline Face Count
    */
    faceCount: PropTypes.number,

    /**
    * @uxpindescription The total number of persons to represent in the control 
    * @uxpinpropname Total Count
    */
    number: PropTypes.number,

    /**
    * @uxpindescription The control's size 
    * @uxpinpropname Size
    */
    size: PropTypes.oneOf(['size16', 'size24', 'size28', 'size32', 'size40']),

    /** 
    * @uxpindescription Whether to display the Add button 
    * @uxpinpropname Add Button
    */
    showAddButton: PropTypes.bool,

    /** 
    * @uxpindescription Whether to display the overflow button. 
    * @uxpinpropname Show Overflow Button
    */
    showOverflowButton: PropTypes.bool,

    /**
     * @uxpindescription Fires when one of the personas is clicked on.
     * @uxpinpropname * Click
     * */
    onClick: PropTypes.func,

    /**
     * @uxpindescription Fires when the Add Button is clicked on.
     * @uxpinpropname Add Click
     * */
    onAddClick: PropTypes.func,

    /**
     * @uxpindescription Fires when the Overflow Button is clicked on.
     * @uxpinpropname Overflow Click
     * */
    onOverflowClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Facepile.defaultProps = {
    size: 'size32',
    selectedIndex: '',
    number: 5,
    faceCount: 5,
    showAddButton: false,
    showOverflowButton: true,
};


export { Facepile as default };
