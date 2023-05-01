import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Coachmark as FCoachmark } from '@fluentui/react/lib/Coachmark';
import { TeachingBubbleContent } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';

const stretch = 'stretch';
const coStackTokens = {
  childrenGap: 6,
  padding: 0,
};

class Coachmark extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  set() {
    this.setState({ open: this.props.show });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.set();
    }
  }

  dismissControl() {
    //Set the control to not open to dismiss it.
    this.setState({ open: false });

    this.props.show = false;
  }

  toggleVisibility() {
    this.setState({
      open: !this.state.open,
    });
  }

  _onDismissClicked() {
    //Notify UXPin that the Close icon has been clicked on.
    if (this.props.dismiss) {
      this.props.dismiss();
    }

    this.dismissControl();
  }

  _onPrimaryButtonClicked() {
    //Notify UXPin of the event.
    if (this.props.primaryButtonClick) {
      this.props.primaryButtonClick();
    }

    this.dismissControl();
  }

  _onSecondaryButtonClicked() {
    //Notify UXPin of the event.
    if (this.props.secondaryButtonClick) {
      this.props.secondaryButtonClick();
    }

    this.dismissControl();
  }

  render() {
    const tbTargetID = _.uniqueId('target_');

    const marker = (
      <div
        style={{
          width: 20,
          height: 20,
          background: this.props.showMarker ? '#640487' : 'transparent',
          borderRadius: 4,
        }}
      />
    );

    var coChild = marker;

    //To hold the list of contents
    var coList = [];

    //If there are any props for the body message, add that first.
    if (this.props.text && this.props.text?.trim()?.length > 0) {
      coList.push(
        <StackItem align={stretch} grow={false}>
          {this.props.text.trim()}
        </StackItem>
      );
    }

    if (this.props.children) {
      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      if (childList.length) {
        //The first child is the target for the popup control
        coChild = childList[0];

        if (childList.length > 1) {
          //Let's assemble the list of things to chose in the tooltip
          let ttChildren = childList.slice(1);
          if (ttChildren && ttChildren.length > 0) {
            var i;
            for (i = 0; i < ttChildren.length; i++) {
              let child = ttChildren[i];
              coList.push(
                <StackItem align={stretch} grow={false}>
                  {child}
                </StackItem>
              );
            }
          }
        }
      }
    }

    //Create the stack of objects
    let ttContents = (
      <Stack tokens={coStackTokens} horizontal={false} wrap={false} horizontalAlign={stretch}>
        {coList}
      </Stack>
    );

    //Determine whether to show the Primary and Secondary buttons.
    var priBtnProps = undefined;
    var secBtnProps = undefined;

    if (this.props.primaryButtonLabel && this.props.primaryButtonLabel.trim().length > 0) {
      priBtnProps = {
        text: this.props.primaryButtonLabel,
        onClick: () => {
          this._onPrimaryButtonClicked();
        },
      };
    }

    if (this.props.secondaryButtonLabel && this.props.secondaryButtonLabel.trim().length > 0) {
      secBtnProps = {
        text: this.props.secondaryButtonLabel,
        onClick: () => {
          this._onSecondaryButtonClicked();
        },
      };
    }

    var footerText = undefined;
    if (this.props.footerText && this.props.footerText.length) {
      footerText = this.props.footerText.trim();
    }

    return (
      <>
        {/* <div
                    className="trigger"
                    onClick={() => { this.setState({ open: !this.state.open }) }}
                    ref={this._targetElm}
                    style={{
                        width: 20,
                        height: 20,
                        background: this.props.showMarker ? '#640487' : 'transparent',
                        borderRadius: 4,
                    }} /> */}
        <Stack
          id={tbTargetID}
          onClick={() => {
            this.toggleVisibility();
          }}
        >
          {coChild}
        </Stack>

        {this.state.open && (
          <FCoachmark
            {...this.props}
            target={`#${tbTargetID}`}
            positioningContainerProps={{
              doNotLayer: false,
              directionalHint: DirectionalHint[this.props.direction],
              directionalHintFixed: true,
            }}
          >
            <TeachingBubbleContent
              headline={this.props.title}
              footerContent={footerText}
              hasCloseIcon={true}
              isWide={this.props.extraWide}
              primaryButtonProps={priBtnProps}
              secondaryButtonProps={secBtnProps}
              onDismiss={() => {
                this._onDismissClicked();
              }}
            >
              {ttContents}
            </TeachingBubbleContent>
          </FCoachmark>
        )}
      </>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Coachmark.propTypes = {
  /**
   * Don't show this prop in the UXPin Editor.
   * @uxpinignoreprop
   * @uxpindescription Contents for the body of the control.
   * @uxpinpropname Children
   */
  children: PropTypes.node,

  /**
   * @uxpindescription Whether to display the Coachmark
   * @uxpinpropname Show
   */
  show: PropTypes.bool,

  /**
   * @uxpindescription Whether to show the purple target marker on the canvas
   * @uxpinpropname Show Marker
   */
  showMarker: PropTypes.bool,

  /**
   * @uxpindescription Whether to give the control extra width.
   * @uxpinpropname Extra Wide
   * */
  extraWide: PropTypes.bool,

  /**
   * @uxpindescription The control's title text
   * @uxpinpropname Headline
   */
  title: PropTypes.string,

  /**
   * @uxpindescription The main message text
   * @uxpincontroltype textfield(6)
   */
  text: PropTypes.string,

  /**
   * @uxpindescription Footer text to display in the bottom left corner.
   * @uxpinpropname Footer Text
   */
  footerText: PropTypes.string,

  /**
   * @uxpindescription The displayed text on the Primary Button. Remove text to hide button.
   * @uxpinpropname Text-Primary Button
   */
  primaryButtonLabel: PropTypes.string,

  /**
   * @uxpindescription The displayed text on the Secondary Button. Remove text to hide button.
   * @uxpinpropname Text-Secondary Button
   */
  secondaryButtonLabel: PropTypes.string,

  /**
   * @uxpindescription The control's display direction
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

  /**
   * @uxpindescription Fires when the Close button is clicked
   * @uxpinpropname Dismiss
   */
  dismiss: PropTypes.func,

  /**
   * @uxpindescription Fires when the Primary Button is clicked on
   * @uxpinpropname Primary Button Click
   */
  primaryButtonClick: PropTypes.func,

  /**
   * @uxpindescription Fires when the Secondary Button is clicked on
   * @uxpinpropname Secondary Button Click
   */
  secondaryButtonClick: PropTypes.func,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Coachmark.defaultProps = {
  show: true,
  showMarker: true,
  extraWide: true,
  title: 'Coachmark',
  text: "Set my 'Show' property to true to view me in a prototype.",
  direction: 'bottomCenter',
  primaryButtonLabel: 'Next',
  secondaryButtonLabel: 'Close',
};

export { Coachmark as default };
