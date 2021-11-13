import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from '@fluentui/react/lib/Nav';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import { UxpMenuUtils } from '../_helpers/uxpmenuutils';



//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultNavItems = `icon(ViewDashboard) Overview
icon(Build) Builds
icon(PlugConnected) Pipelines
icon(Processing) Production
icon(StackedColumnChart2Fill) Metrics`;

const defaultTopPadding = 24;

const defaultStyledBgColor = "#F5F7FA";
const defaultStyledBorderColor = '#CBD2D6';



class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [],
            selectedIndex: 1,
            disabledIndexes: [],
        }
    }

    set() {
        let disabledItems = UxpNumberParser.parseInts(this.props.disabled);

        var items = [];
        if (this.props.items) {
            items = UxpMenuUtils.parseNavItemText(this.props.items, this.props.selectedIndex, disabledItems, true);
        }

        this.setState({
            disabledIndexes: disabledItems,
            links: items,
            selectedIndex: this.props.selectedIndex,
        });
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIndex !== this.props.selectedIndex ||
            prevProps.items !== this.props.items ||
            prevProps.disabled !== this.props.disabled) {
            this.set();
        }

        //The disabled indexes and items are set in one call
        //Call them both if one or the other has changed
        if (prevProps.disabled !== this.props.disabled ||
            prevProps.items !== this.props.items) {
            this.set();
        }
    }

    _onRenderLink(item) {
        if (!item)
            return;

        console.log("item name: " + JSON.stringify(item.link.name));
        console.log("     key: " + JSON.stringify(item.link.key));
        console.log("     icon: " + JSON.stringify(item.link.icon));
        console.log("     url: " + JSON.stringify(item.link.url));
        console.log("     title: " + JSON.stringify(item.link.title));
        console.log("     disabled: " + JSON.stringify(item.link.disabled));
    }

    _onItemClick(item) {

        if (!item)
            return;

        //The item's key is already its 1-based index.
        let index = item.key;

        if (index !== this.state.selectedIndex) {
            this.setState(
                { selectedIndex: index }
            )

            //Raise this event to UXPin. We'll send them info about which item was clicked on.
            if (this.props[`onLink${index}Click`]) {
                this.props[`onLink${index}Click`](index);
            }
        }
    }

    render() {

        //Adjust for user input. Neg values not allowed.
        let index = this.props.selectedIndex > 0 ? this.props.selectedIndex : 1;

        let isStyled = this.props.styledBackground;
        let topPad = this.props.navTopPadding > 0 ? this.props.navTopPadding : 0;

        let mHeight = this.props.controlHeight > 0 ? this.props.controlHeight : 1;

        let navStyles = {
            root: {
                height: 'auto',
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
                        onRenderLink={(evt, item) => { this._onRenderLink(item) }}
                        onLinkClick={(evt, item) => { this._onItemClick(item) }} />
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
     * @uxpindescription The 1-based index value of the tab to be shown as selected by default. 
     * @uxpinpropname Selected Index
     */
    selectedIndex: PropTypes.number,

    /**
     * @uxpindescription The list of nav items. Put each item on a separate line. Specify an icon using: icon(IconName) Nav Text. For a second level child nav item, start the line with a star: * icon(IconName) Child Item
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
};


export { Nav as default };