import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav } from '@fluentui/react/lib/Nav';
import { DetailsList } from '@fluentui/react/lib/DetailsList';
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



class Wizard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [],
            selectedIndex: 1,
            disabledIndexes: [],
        }
    }

    set() {

    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            this.set();
        }
    }

    _onItemClick(item) {

    }

    render() {


        return (
            //For some reason, the control will only display properly in UXPin with this weird wrapping & logic. 
            <>

            </>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Wizard.propTypes = {


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
     * @uxpindescription The list of nav items to show as disabled, separated with commas. (1-based index)
     * @uxpinpropname Disabled Items
     * */
    disabled: PropTypes.string,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Wizard.defaultProps = {
};


export { Wizard as default };