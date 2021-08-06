import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Panel as FPanel, PanelType } from '@fluentui/react/lib/Panel';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';


// const Panel = () => {
//   const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
// }

const panelSize = {
  small: PanelType.smallFixedFar,
  smallFluid: PanelType.smallFluid,
  medium: PanelType.medium,
  large: PanelType.largeFixed,
  xLarge: PanelType.extraLarge,
};

const panelSizeList = ["small", "smallFluid", "medium", "large", "xLarge"];
const defaultPanelSize = 'medium';


class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.set();
    }
  }

  set() {
    this.setState({
      isOpen: this.props.show,
    });
  }

  _onDismiss() {
    this.props.show = false;

    this.setState({
      isOpen: false,
    });

    if (this.onPanelDismiss) {
      this.onPanelDismiss(false);
    }
  }

  render() {

    // let pt = panelSize`${this.props.panelWidth}`;
    let rt = panelSize[this.props.panelWidth];
    console.log("RT: " + rt);

    //****************************
    //For Inner Stack

    const stackTokens = {
      childrenGap: 24,
      padding: 0,
      paddingTop: 24,
    };

    //Set up the StackItems
    var stackList = [];
    if (this.props.children) {

      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      //Now, we configure the StackItems
      if (childList.length) {

        for (var i = 0; i < childList.length; i++) {
          let child = childList[i];
          let key = _.uniqueId('child_');

          let stack = (
            <StackItem
              key={key}
              align={'stretch'}
              grow={false}
            >
              {child}
            </StackItem>
          );
          stackList.push(stack);
        }
      }
    }

    let panelContents = '';

    //Do we have children? 
    if (stackList && stackList.length > 0) {
      panelContents = (
        <Stack
          {...this.props}
          tokens={stackTokens}
          horizontal={false}
          horizontalAlign={'left'}
          wrap={false}
        >
          {stackList}
        </Stack>
      );
    }

    return (
      <div>
        <FPanel
          {...this.props}
          headerText={this.props.headerText}
          isOpen={this.state.isOpen}
          hasCloseButton={true}
          isLightDismiss={this.props.lightDismiss}
          onDismiss={(evt) => this._onDismiss()}
          closeButtonAriaLabel={"Close"}
        >
          {panelContents}
        </FPanel>
      </div >
    );

  }

};

Panel.propTypes = {

  /**
   * @uxpinignoreprop hide this from the user
   */
  children: PropTypes.node,

  /**
   * @uxpindescription To show or hide the panel. 
   * @uxpinpropname Show
   */
  show: PropTypes.bool,

  /**
  * @uxpindescription The text to be displayed in the header of the panel 
  * @uxpinpropname Header Text
  */
  headerText: PropTypes.string,

  /**
  * @uxpindescription The display width of the panel. 
  * @uxpinpropname Panel Size
  */
  panelWidth: PropTypes.oneOf(panelSizeList),

  /**
   * @uxpindescription To allow dismissing the panel by clicking anywhere off it.
   * @uxpinpropname Light Dismiss
   */
  lightDismiss: PropTypes.bool,

  /**
    * @uxpindescription Fires when the Panel is closed
    * @uxpinpropname Dismiss
    */
  onPanelDismiss: PropTypes.func
};


Panel.defaultProps = {
  headerText: "Panel Header",
  show: true,
  lightDismiss: true,
  panelWidth: defaultPanelSize,
}


export { Panel as default };
