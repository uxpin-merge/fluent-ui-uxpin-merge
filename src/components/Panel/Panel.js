import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Panel as FPanel, PanelType } from '@fluentui/react/lib/Panel';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';

const panelSize = {
  small: PanelType.smallFluid,
  medium: PanelType.medium,
  large: PanelType.large,
  xLarge: PanelType.extraLarge,
};

const panelSizeList = ['small', 'medium', 'large', 'xLarge'];
const defaultPanelSize = 'medium';

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
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

  _onRenderFooterContent() {
    if (this.props.hasFooter && this.props.children) {
      //Get the last child in the array
      let childList = React.Children.toArray(this.props.children);

      if (childList.length && childList.length > 0) {
        let footerIndex = childList.length - 1;

        if (footerIndex > 0) {
          let child = childList[footerIndex];
          let key = _.uniqueId('child_');

          let footerContent = (
            <Stack horizontal={true} horizontalAlign={'left'} wrap={false}>
              <StackItem key={key} align={'stretch'} grow={false}>
                {child}
              </StackItem>
            </Stack>
          );

          return footerContent;
        }
      }
    }

    return '';
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
    //Panel Type
    let panelType = panelSize[this.props.panelWidth];

    //****************************
    //For Inner Stack

    //Let's make sure we have a positive number.
    let pad = this.props.gutterPadding > 0 ? this.props.gutterPadding : 0;

    const stackTokens = {
      childrenGap: pad,
      padding: 0,
    };

    //Set up the StackItems
    var stackList = [];

    if (this.props.children) {
      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      //Now, we configure the StackItems
      if (childList.length) {
        let footerIndex = childList.length > 0 ? childList.length - 1 : -1;

        for (var i = 0; i < childList.length; i++) {
          let child = childList[i];

          if (this.props.hasFooter && i === footerIndex) {
            //Ignore this object for now. We'll render it later.
          } else {
            let key = _.uniqueId('child_');

            let stack = (
              <StackItem key={key} align={'stretch'} grow={false}>
                {child}
              </StackItem>
            );
            stackList.push(stack);
          }
        }
      }
    } //organize children

    let panelContents = '';

    //Do we have children?
    if (stackList && stackList.length > 0) {
      panelContents = (
        <div>
          <div
            style={{
              width: '100%',
              height: '24px',
            }}
          />
          <Stack {...this.props} tokens={stackTokens} horizontal={false} horizontalAlign={'left'} wrap={false}>
            {stackList}
          </Stack>
        </div>
      );
    }

    return (
      <div>
        <div //A visual aid for the designer to see in UXPin
          style={{
            width: '100px',
            height: '100px',
            color: 'white',
            textAlign: 'center',
            verticalAlign: 'middle',
            background: '#666600',
            borderRadius: 10,
          }}
        >
          <br />
          <em>
            <strong>Panel:</strong>
          </em>
          <br />
          Move this marker offscreen
        </div>
        <FPanel
          {...this.props}
          closeButtonAriaLabel={'Close'}
          headerText={this.props.headerText}
          isOpen={this.state.isOpen}
          hasCloseButton={true}
          isLightDismiss={this.props.lightDismiss}
          type={panelType}
          isFooterAtBottom={true}
          onRenderFooterContent={() => this._onRenderFooterContent()}
          onDismiss={() => this._onDismiss()}
        >
          {panelContents}
        </FPanel>
      </div>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
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
   * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
   * @uxpindescription Row padding between the items in the group. Value must be 0 or more.
   * @uxpinpropname Gutter
   */
  gutterPadding: PropTypes.number,

  /**
   * @uxpindescription To put the last child object into the Footer area.
   * @uxpinpropname Footer
   */
  hasFooter: PropTypes.bool,

  /**
   * @uxpindescription To allow dismissing the panel by clicking anywhere off it.
   * @uxpinpropname Light Dismiss
   */
  lightDismiss: PropTypes.bool,

  /**
   * @uxpindescription Fires when the Panel is closed
   * @uxpinpropname Dismiss
   */
  onPanelDismiss: PropTypes.func,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Panel.defaultProps = {
  headerText: 'Panel Header',
  show: true,
  lightDismiss: true,
  panelWidth: defaultPanelSize,
  gutterPadding: 24,
  hasFooter: false,
};

export { Panel as default };
