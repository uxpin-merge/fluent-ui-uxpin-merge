import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Pivot as FPivot,
  PivotItem
} from '@fluentui/react/lib/Pivot';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpMenuUtils } from '../_helpers/uxpmenuutils';
import * as UXPinParser from '../_helpers/UXPinParser';



//Default pivot tab items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultTabs = `Tab One
Tab Two
Tab Three
Tab Four`;

const verticalAlign = 'start';
const stretchAlign = 'stretch';

//In case we can't parse user-entered internal padding info or it's unspecified
const defaultPadding = "12";



class Pivot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabs !== this.props.tabs
      || prevProps.selectedIndex !== this.props.selectedIndex) {

      this.set();
    }
  }

  set() {

    let items = [];
    let pivotItems = this.props.tabs?.split('\n');
    for (i = 0; i < pivotItems.length; i++) {

      console.log("Looking at: " + pivotItems[i]);

      let propsList = UxpMenuUtils.parseSimpleListText(pivotItems[i], true, false);
      if (propsList) {

        console.log("     Raw props: " + JSON.stringify(propsList[0]));


        let iconName = propsList[0]?.iconProps?.iconName ? propsList[0].iconProps.iconName : '';
        let pivotText = propsList[0].text ? propsList[0].text : " ";

        console.log("     text: " + pivotText + ", iconName: " + iconName);

        let pivotProps = {
          key: i + 1,
          text: pivotText ? pivotText : '',
          icon: iconName ? iconName : undefined,
        };

        items.push(pivotProps);
      }
    }

    // let items = UXPinParser.parse(this.props.tabs).map(
    //   (item, index) => ({
    //     key: index + 1,
    //     text: item.text ? item.text : '',
    //     icon: item?.iconName,
    //   }));

    this.setState({
      tabs: items,
      selectedIndex: this.props.selectedIndex
    });
  }

  _onLinkClick(selectedItem) {

    //The index comes in 1-based. 1 is also our value floor.
    let newIndex = selectedItem.props.itemKey > 0 ? selectedItem.props.itemKey : 1;

    if (newIndex !== this.state.selectedIndex) {
      this.setState(
        { selectedIndex: newIndex }
      )

      //If the index changed, let's push the new index value
      if (this.props.onIndexChanged) {
        this.props.onIndexChanged(newIndex);
      }
    }
  }

  render() {

    //Set up the tabs
    //Microsoft makes us instantiate tabs individually. For some reason, we can't set the tabs through props.
    let tabs = this.state.tabs;
    var i;
    var tabList = [];

    for (i = 0; i < tabs.length; i++) {
      let t = tabs[i];

      //The key is already 1 based
      //Let's avoid empty items
      if (t?.text || t?.icon) {
        let tab = (
          <PivotItem
            headerText={t.text}
            itemKey={t.key}
            key={t.key}
            itemIcon={t.icon}
          />
        );

        tabList.push(tab);
      }
    }

    //The prop is 1-based. The tab keys are also 1-based.
    let key = this.state.selectedIndex < 1 ? 1
      : this.state.selectedIndex > tabList.length ? tabList.length
        : this.state.selectedIndex;

    //With one number, the padding applies to both rows and columns.  
    //Let's make sure we have a positive number. 
    let pad = this.props.gutterPadding > -1 ? this.props.gutterPadding : 0;

    const stackTokens = {
      childrenGap: pad,
      padding: 0,
    };

    //Set up the Tab Panel
    var tabPanel = '';
    if (this.props.children) {
      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      //Now, we configure the StackItem
      if (childList.length && (key - 1) < childList.length) {
        //Minus 1 for the 0-based array
        let child = childList[key - 1];

        tabPanel = (
          <StackItem
            key={key}
            align={stretchAlign}
            grow={false}
          >
            {child}
          </StackItem>
        );
      }
    }

    return (
      <Stack
        {...this.props}
        horizontal={false}
        tokens={stackTokens}
        horizontalAlign={stretchAlign}
        verticalAlign={verticalAlign}
        wrap={false}
      >
        <StackItem>
          <FPivot
            {...this.props}
            selectedKey={key}
            onLinkClick={(pi) => { this._onLinkClick(pi); }} >
            {tabList}
          </FPivot>
        </StackItem>

        {tabPanel}

      </Stack>
    )
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Pivot.propTypes = {

  /**
   * Don't show this prop in the UXPin Editor. 
   * @uxpinignoreprop 
   * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
   * @uxpinpropname Right Contents
   */
  children: PropTypes.node,

  /**
  * @uxpindescription The 1-based index value of the tab to be shown as selected by default. This prop's live value is available for scripting.
  * @uxpinpropname * Selected Index 
  * @uxpinbind onIndexChanged
  */
  selectedIndex: PropTypes.number,

  /**
  * @uxpindescription The list of tabs. Put one item on each row. Enclose an item in quotes if including a comma. Supports the icon(IconName) feature.
  * @uxpinpropname Tabs
  * @uxpincontroltype codeeditor
  */
  tabs: PropTypes.string,

  /**
   * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
   * @uxpindescription The vertical padding between the Pivot and the tab panel.
   * @uxpinpropname Gutter
   */
  gutterPadding: PropTypes.number,

  /**
   * @uxpindescription Fires when the selected index changes.
   * @uxpinpropname * Index Changed
   * */
  onIndexChanged: PropTypes.func,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Pivot.defaultProps = {
  tabs: defaultTabs,
  selectedIndex: 1,
  gutterPadding: 24,
};

export { Pivot as default };
