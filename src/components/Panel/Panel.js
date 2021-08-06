import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Panel as FPanel, PanelType } from '@fluentui/react/lib/Panel';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';


// const Panel = () => {
//   const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
// }

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
    console.log("Just hit dismiss");

    this.props.show = false;

    this.setState({
      isOpen: false,
    });

    if (this.dismiss) {
      this.dismiss(true);
    }
  }

  render() {

    //****************************
    //For Inner Stack

    const stackTokens = {
      childrenGap: 24,
      padding: 0,
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
      let padStyle = {
        paddingTop: 24,
      };

      panelContents = (
        <Stack
          {...this.props}
          tokens={stackTokens}
          horizontal={false}
          horizontalAlign={'left'}
          wrap={false}
          styles={padStyle}
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
          onDismissed={() => this._onDismiss()}
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
   * @uxpindescription To show or hide the panel 
   */
  show: PropTypes.bool,

  /**
  * @uxpindescription The text to be displayed in the header of the panel 
  * @uxpinpropname Header Text
  */
  headerText: PropTypes.string,

  /**
    * @uxpindescription Fires when the Panel is closed
    * @uxpinpropname Dismiss
    */
  dismiss: PropTypes.func
};


Panel.defaultProps = {
  headerText: "Panel Header",
  show: true,
}

export { Panel as default };
