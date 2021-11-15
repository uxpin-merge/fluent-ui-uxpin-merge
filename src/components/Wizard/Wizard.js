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

        let hello = "Hello!";

        return (
            //For some reason, the control will only display properly in UXPin with this weird wrapping & logic. 
            <>
                {hello}
            </>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Wizard.propTypes = {

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
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Wizard.defaultProps = {
};


export { Wizard as default };