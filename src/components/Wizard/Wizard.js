import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav } from '@fluentui/react/lib/Nav';
import { ConstrainMode, SelectionMode } from '@fluentui/react/';
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

        const colID = _.uniqueId('dlColumn_');

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

    _setColumn() {
        const columnParams = {
            key: colID,
            name,
            fieldName: "Steps",
            isResizable: false,
            width: "100%",
            isSorted: false,
            isSortedDescending: false,
            isMultiline: true,
            textAlign: 'center',
        }
    }

    _onRenderItem(item, index, column) {
        return (index + "Hi! " + item);
    }

    _onItemClick(item) {

    }

    render() {

        let hello = "Hello!";
        let items = ["foo", "bar"];

        return (
            //For some reason, the control will only display properly in UXPin with this weird wrapping & logic. 
            <DetailsList
                isHeaderVisible={false}
                items={items}
                selectionMode={SelectionMode.none}
                constrainMode={ConstrainMode[ConstrainMode.horizontalConstrained]}
                onRenderItemColumn={(item, index, column) => { this._onRenderItem(item, index, column) }}
            />
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