import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from '@fluentui/react/lib/Nav';
import { getTokens, csv2arr } from '../_helpers/parser';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';






//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultNavItems = `icon(Dashboard) Overview
icon(FavoriteStarFill) Favorites
icon(Upload) Upload
icon(BIDashboard) Metrics
icon(Admin) Admin`;

const defaultTopPadding = 24;

const defaultStyledBgColor = "#F5F7FA";
const defaultStyledBorderColor = '#CBD2D6';



class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [],
            selectedIndex: 1,
            disabledIndexes: []
        }
    }

    componentDidMount() {
        this.setState(
            { selectedIndex: this.props.selectedIndex }
        )
        this.setDisabledIndexes(this.setItems);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            this.setState(
                { selectedIndex: this.props.selectedIndex }
            )
        }

        //The disabled indexes and items are set in one call
        //Call them both if one or the other has changed
        if (prevProps.disabled !== this.props.disabled ||
            prevProps.items !== this.props.items) {
            this.setDisabledIndexes(this.setItems);
        }
    }

    getLeftIcon(str) {
        let tokens = getTokens(str).tokens;

        let leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start');

        return leftIcon ? leftIcon.target : '';
    }

    //Parse the nav items
    setItems(callback) {

        let itemlist = csv2arr(this.props.items)
            .flat()
            .map((val, i) => ({
                name: getTokens(val).text,
                key: i + 1,  //Setting the key to the 1-based index
                disabled: this.state.disabledIndexes.includes(i + 1),
                icon: this.getLeftIcon(val)
            }));

        console.log("Found these nav items: ");
        var i;
        for (i = 0; i < itemlist.length; i++) {
            let item = itemlist[i];
            console.log("    " + item.key + " " + item.text + " " + item.icon);
        }

        this.setState({
            links: itemlist,
        }, callback)
    }

    //Parse the disabled items
    setDisabledIndexes(callback) {
        let disabledIndexes = UxpNumberParser.parseInts(this.props.disabled);

        this.setState(
            { disabledIndexes },
            callback)
    }

    onMenuClick(event, element) {
        event.preventDefault();

        const index = this.state.links.findIndex(link => link.key === element.key) + 1;

        this.setState(
            { selectedIndex: index }
        )

        //If the prop for an individual nav item's click event exists, let's push it. 
        //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
        if (this.props[`onLink${index}Click`]) {
            this.props[`onLink${index}Click`](index);
        }
    }

    render() {

        //Adjust for user input. Neg values not allowed.
        let index = this.props.selectedIndex > 0 ? this.props.selectedIndex : 1;

        let isStyled = this.props.styledBackground;
        let topPad = this.props.navTopPadding > 0 ? this.props.navTopPadding : 0;

        let mHeight = this.props.controlHeight > 0 ? this.props.controlHeight : 1;
        let height = 'auto';
        if (this.props.stretch) {
            height = '100%'
        }

        let navStyles = {
            root: {
                height,
                minHeight: mHeight,
                width: 'auto',
                paddingTop: topPad + 'px',
                backgroundColor: isStyled ? defaultStyledBgColor : 'transparent',
                borderRight: isStyled ? "1px solid " + defaultStyledBorderColor : 'none',
            }
        };

        let groupParams = [
            { links: this.state.links }
        ];


        return (
            //For some reason, the control will only display properly in UXPin with this weird wrapping & logic. 
            <>
                {this.state.links.length > 0 ?
                    <FNav
                        {...this.props}
                        selectedKey={index}
                        styles={navStyles}
                        groups={groupParams}
                        onLinkClick={this.onMenuClick.bind(this)} />
                    : <div> </div>}
            </>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Nav.propTypes = {

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Top padding above the control. Value must be 0 or more. 
     * @uxpinpropname Top Padding
     */
    navTopPadding: PropTypes.number,

    /**
    * @uxpindescription The height of the control   
    * @uxpinpropname Height
    */
    controlHeight: PropTypes.number,

    /**
    * @uxpindescription To stretch the control vertically to fill the space  
    * @uxpinpropname Stretch
    */
    stretch: PropTypes.bool,

    /**
     * @uxpindescription The 1-based index value of the tab to be shown as selected by default
     * @uxpinpropname Selected Index
     */
    selectedIndex: PropTypes.number,

    /**
     * @uxpindescription The list of nav items. Put each item on a separate line. Specify an icon using: icon(IconName)
     * @uxpinpropname Items
     * @uxpincontroltype codeeditor
     */
    items: PropTypes.string,

    /**
     * @uxpindescription Whether to apply styling to the control's background
     * @uxpinpropname Styled Background
     * */
    styledBackground: PropTypes.bool,

    /**
     * @uxpindescription The list of nav items to show as disabled, separated with commas. (1-based index)
     * @uxpinpropname Disabled Items
     * */
    disabled: PropTypes.string,

    /**
    * @uxpindescription Fires when Item 1 is clicked
    * @uxpinpropname Item 1 Click
    */
    onLink1Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 2 is clicked
    * @uxpinpropname Item 2 Click
    */
    onLink2Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 3 is clicked
    * @uxpinpropname Item 3 Click
    */
    onLink3Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 4 is clicked
    * @uxpinpropname Item 4 Click
    */
    onLink4Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 5 is clicked
    * @uxpinpropname Item 5 Click
    */
    onLink5Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 6 is clicked
    * @uxpinpropname Item 6 Click
    */
    onLink6Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 7 is clicked
    * @uxpinpropname Item 7 Click
    */
    onLink7Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 8 is clicked
    * @uxpinpropname Item 8 Click
    */
    onLink8Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 9 is clicked
    * @uxpinpropname Item 9 Click
    */
    onLink9Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 10 is clicked
    * @uxpinpropname Item 10 Click
    */
    onLink10Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 11 is clicked
    * @uxpinpropname Item 11 Click
    */
    onLink11Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 12 is clicked
    * @uxpinpropname Item 12 Click
    */
    onLink12Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 13 is clicked
    * @uxpinpropname Item 13 Click
    */
    onLink13Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 14 is clicked
    * @uxpinpropname Item 14 Click
    */
    onLink14Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Item 15 is clicked
    * @uxpinpropname Item 15 Click
    */
    onLink15Click: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Nav.defaultProps = {
    navTopPadding: defaultTopPadding,
    selectedIndex: 1,
    items: defaultNavItems,
    styledBackground: false,
    disabled: '',
    stretch: true,
};


export { Nav as default };