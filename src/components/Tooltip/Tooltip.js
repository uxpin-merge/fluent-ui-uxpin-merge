import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import Text from '../Text/Text';

const ttStackTokens = {
  childrenGap: 12,
  padding: 6,
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ttDirection: 'topCenter',
    };
  }

  set() {
    //Let's see if we can parse a real date
    let direction = this.props.direction;

    this.setState({ ttDirection: direction });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.direction !== this.props.direction) {
      this.set();
    }
  }

  render() {
    const ttTargetID = _.uniqueId('ttTarget_');
    const tooltipID = _.uniqueId('tooltip_');

    var ttChild = (
      <div
        style={{
          display: 'inline-block',
          width: 20,
          height: 20,
          borderRadius: 10,
          background: this.props.showMarker ? '#640487' : 'transparent',
        }}
      ></div>
    );

    var ttList = [];
    if (this.props.text && this.props.text?.trim()?.length > 0) {
      ttList.push(
        <StackItem align={'stretch'} grow={false}>
          <Text textValue={this.props.text.trim()} size={'small'} />
        </StackItem>
      );
    }

    if (this.props.children) {
      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      if (childList.length) {
        //We only use the first child. All other children are ignored.
        ttChild = childList[0];

        if (childList.length > 1) {
          //Let's assemble the list of things to chose in the tooltip
          let ttChildren = childList.slice(1);
          if (ttChildren && ttChildren.length > 0) {
            var i;
            for (i = 0; i < ttChildren.length; i++) {
              let child = ttChildren[i];
              ttList.push(
                <StackItem align={'stretch'} grow={false}>
                  {child}
                </StackItem>
              );
            }
          }
        }
      }
    }

    //Reset the variable to the stack of objects
    let ttContents = (
      <Stack tokens={ttStackTokens} horizontal={false} wrap={false} horizontalAlign={'stretch'}>
        {ttList}
      </Stack>
    );

    const ttProps = {
      gapSpace: 4,
      target: `#${ttTargetID}`,
      isBeakVisible: this.props.showBeak,
    };

    return (
      <>
        <TooltipHost
          content={ttContents}
          directionalHint={DirectionalHint[this.props.direction]}
          closeDelay={300}
          id={tooltipID}
          calloutProps={ttProps}
        >
          <Stack id={ttTargetID} aria-describedby={tooltipID}>
            {ttChild}
          </Stack>
        </TooltipHost>
      </>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Tooltip.propTypes = {
  /**
   * Don't show this prop in the UXPin Editor.
   * @uxpinignoreprop
   * @uxpindescription Contents for the body of the control.
   * @uxpinpropname Children
   */
  children: PropTypes.node,

  /**
   * @uxpindescription The main message text
   * @uxpincontroltype textfield(4)
   */
  text: PropTypes.string,

  /**
   * @uxpindescription In the standalone use case, whether to show the purple target marker on the canvas
   * @uxpinpropname Show Marker
   */
  showMarker: PropTypes.bool,

  /**
   * @uxpindescription Whether to show the 'beak' (or tip) of the Tooltlip
   */
  showBeak: PropTypes.bool,

  /**
   * @uxpindescription The control's display direction
   * @uxpinpropname Hint Direction
   */
  direction: PropTypes.oneOf([
    'topLeftEdge',
    'topCenter',
    'topRightEdge',
    'topAutoEdge',
    'bottomLeftEdge',
    'bottomCenter',
    'bottomRightEdge',
    'bottomAutoEdge',
    'leftTopEdge',
    'leftCenter',
    'leftBottomEdge',
    'rightTopEdge',
    'rightCenter',
    'rightBottomEdge',
  ]),
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Tooltip.defaultProps = {
  showBeak: true,
  text: "I'm a basic tooltip",
  direction: 'topCenter',
  showMarker: true,
};

export { Tooltip as default };
