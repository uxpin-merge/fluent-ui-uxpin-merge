import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConstrainMode, SelectionMode } from '@fluentui/react/';
import { DetailsList } from '@fluentui/react/lib/DetailsList';
import { Nav } from '@fluentui/react/lib/Nav';
import { Stack } from '@fluentui/react/lib/Stack';
import Text from '../Text/Text';
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


const colID = _.uniqueId('dlColumn_');
const columnParams = [{
    key: colID,
    fieldName: "Steps",
    isResizable: false,
    minWidth: "100%",
    maxWidth: "100%",
    width: "100%",
    isSorted: false,
    isSortedDescending: false,
    isMultiline: true,
    textAlign: 'center',
}];


class Wizard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        }
    }

    set() {
        this.setItems();
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIndex !== this.props.selectedIndex ||
            prevProps.items !== this.props.items) {
            this.set();
        }
    }

    setItems() {
        var displayItemList = [];

        if (this.props.links) {
            let items = this.props.links.match(/[^\r\n]+/g);

            if (items && items.length) {
                for (var i = 0; i < items.length; i++) {
                    let item = items[i];

                    let displayItem = (<Text
                        textValue={item}
                        size={"medium"}
                        align={'left'}
                    />);

                    displayItemList.push(displayItem);
                } //for loop
            } //if items
        } //if props.links

        this.setState(
            { items: displayItemList }
        );
    }

    _onItemClick(index) {
        console.log("Clicked on item " + index);
    }

    render() {

        //let items = ["foo", "bar"];

        return (
            //For some reason, the control will only display properly in UXPin with this weird wrapping & logic. 
            <DetailsList
                isHeaderVisible={false}
                items={this.state.items}
                columns={columnParams}
                selectionMode={SelectionMode.none}
                constrainMode={ConstrainMode[ConstrainMode.horizontalConstrained]}
            //onRenderItemColumn={(item, index, column) => { this._onRenderItem(item, index) }}
            //onItemInvoked={(item, index) => { this._onItemClick(index) }}
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