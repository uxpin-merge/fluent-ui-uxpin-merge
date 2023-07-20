import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal } from '@fluentui/react/lib/Modal';
import { Nav } from '@fluentui/react/lib/Nav';
import { ResponsiveMode } from '@fluentui/react/';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { IconButton } from '@fluentui/react/lib/Button';
import ActionButton from '../ActionButton/ActionButton';
import Button from '../Button/Button';
import Link from '../Link/Link';
import { UxpMenuUtils } from '../_helpers/uxpmenuutils';

//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is.
const defaultNavItems = `1 Details | Details
2 Collaborators | Identify Collaborators
3 Review | Review`;

const panelHeadingTextVariant = 'xLarge';
const defaultNextLabel = 'Next';
const defaultSubmitLabel = 'Submit';
const visitedStepIcon = 'SkypeCircleCheck';

const stackStretch = 'stretch';
const stackTop = 'start';
const stackCenter = 'center';

const headerStackItemStyles = {
  root: {
    background: '#106ebe', //themeDarkAlt
  },
};
const wizardStackItemStyles = {
  root: {
    background: '#ffffff',
    minWidth: '80vw',
    maxWidth: '80vw',
  },
};
const bodyPanelStyle = {
  root: {
    background: '#ffffff',
  },
};
const navStyles = {
  root: {
    width: 211,
    maxHeight: '70vh',
    paddingTop: 24,
  },
};
const navStackStyles = {
  root: {
    borderRight: '1px solid #d2d0ce', //neutralQuaternary
  },
};
const bodyStackStyles = {
  root: {
    background: '#f3f2f1', //neutralLighter
    minHeight: '70vh',
    maxHeight: '70vh',
  },
};
const bodyScrollRegionStyles = {
  root: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'inline',
  },
};
const footerStackItemStyles = {
  root: {
    borderTop: '1px dashed #d2d0ce', //neutralQuaternary
  },
};
const wizardHeadingTextStyles = {
  root: {
    color: '#fff',
  },
};
const panelHeadingTextStyles = {
  root: {
    color: '#000000',
  },
};
const dismissButtonStyles = {
  icon: { color: 'white' },
  root: {
    backgroundColor: 'transparent',
    selectors: {
      ':hover .ms-Button-icon': {
        color: '#e1dfdd',
      },
      ':active .ms-Button-icon': {
        color: '#c8c6c4',
      },
    },
  },
  rootHovered: { backgroundColor: 'transparent' },
  rootPressed: { backgroundColor: 'transparent' },
};

class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      navSteps: [],
      visitedSteps: [],
      open: false,
      index: 1, //1-based
    };
  }

  set() {
    let stepList = this._getStepList();
    let navItems = this._getStepNavItems(stepList);

    //Normalize the Selected Index
    let index =
      this.props.selectedIndex < 1
        ? 1
        : this.props.selectedIndex > stepList.length
        ? stepList.length
        : this.props.selectedIndex;

    this.setState({
      open: this.props.show,
      index: index,
      steps: stepList ? stepList : [],
      navSteps: navItems ? navItems : [],
    });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedIndex !== this.props.selectedIndex ||
      prevProps.steps !== this.props.steps ||
      prevProps.selectedIndex !== this.props.selectedIndex ||
      prevProps.show !== this.props.show
    ) {
      this.set();
    }
  }

  _getStepList() {
    let stepList = [];

    if (this.props.steps) {
      let items = this.props.steps.match(/[^\r\n]+/g);

      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          let item = items[i];

          let stepInfo = this._parseStepInfo(item);

          if (stepInfo) stepList.push(stepInfo);
        }
      }
    }

    return stepList;
  }

  _parseStepInfo(rawStr) {
    if (rawStr && rawStr.length) {
      //If the user entered it...
      let sData = rawStr.split('|');

      //Parse left side: display name
      if (sData && sData.length) {
        let left = sData[0].trim();

        //This is the optional Panel Heading for the step.
        let right = sData[1] ? sData[1].trim() : left;

        let stepInfo = {
          step: left,
          heading: right,
        };
        return stepInfo;
      }
    }

    //If we made it this far, there were errors.
    return undefined;
  }

  _getStepNavItems(stepParams) {
    if (!stepParams || stepParams.length < 1) return undefined;

    let navItems = [];

    var i;
    for (i = 0; i < stepParams.length; i++) {
      let stepInfo = stepParams[i];

      var disabled = true;
      let hasVisited = this.state.visitedSteps.indexOf(i + 1) > -1;
      if (i + 1 === this.state.index || hasVisited) {
        disabled = false;
      }

      if (stepInfo.step) {
        let navParams = UxpMenuUtils.getNavItemProps(
          i,
          stepInfo.step,
          hasVisited ? visitedStepIcon : undefined,
          undefined,
          disabled
        );

        if (navParams) navItems.push(navParams);
      }
    }

    return navItems;
  }

  _setNewIndex(index) {
    //Our state is 1 based
    let newIndex = index < 1 ? 1 : index > this.state.steps.length ? this.state.steps.length : index;

    this.setState({ index: newIndex });
  }

  _addVisitedStep(index) {
    if (this.state.visitedSteps.indexOf(index) < 0) {
      this.state.visitedSteps.push(index);
    }
  }

  _onNavItemClick(item) {
    if (!item) return;

    //The item's key is already its 1-based index.
    let index = item.key;
    this._setNewIndex(index);
  }

  _onNextClick() {
    //If we're on the last step, simply dismiss
    if (this.state.index === this.state.steps.length) {
      this.dismissControl();
    } else {
      let index = this.state.index;

      //Let's advance forward if it's not the last step
      this._setNewIndex(index + 1);
      this._addVisitedStep(index);

      //Update the disabled list
      let navItems = this._getStepNavItems(this.state.steps);
      //Let's make sure the menu item for the new value is enabled
      if (index < navItems.length) {
        let item = navItems[index];
        item.disabled = false;

        //If this is also the last item, let's make it's icon a checkmark
        if (index + 1 === navItems.length) item.icon = visitedStepIcon;
      }

      this.setState({
        navSteps: navItems ? navItems : [],
      });
    }
  }

  _onBackClick() {
    let index = this.state.index - 1;
    this._setNewIndex(index);
  }

  _onCancelClick() {
    //Notify UXPin that the Cancel command has been clicked on.
    if (this.props.onCancel) {
      this.props.onCancel();
    }

    if (this.props.dismissOnCancel) this.dismissControl();
  }

  _onHelpClick() {
    if (this.props.onHelp) {
      this.props.onHelp();
    }
  }

  _onDismissClicked() {
    //Notify UXPin that the Close icon has been clicked on.
    if (this.props.dismiss) {
      this.props.dismiss();
    }

    this.dismissControl();
  }

  dismissControl() {
    //Set the control to not open to dismiss it.
    //We have to set the state and prop twice.

    this.setState({
      open: false,
      visitedSteps: [],
      index: 1,
    });

    this.props.show = false;
  }

  render() {
    /** Wizard Heading */
    var wizardHeading = '';
    if (this.props.title) {
      wizardHeading = (
        <Text styles={wizardHeadingTextStyles} variant={panelHeadingTextVariant} block>
          {this.props.title?.trim()}
        </Text>
      );
    }

    let helpBtn = !this.props.showHelp ? (
      ''
    ) : (
      <ActionButton iconName={'info'} text={''} tooltip={'Help'} onClick={() => this._onHelpClick()} />
    );

    let backBtn =
      this.state.index < 2 ? '' : <Button primary={false} text={'Back'} onClick={() => this._onBackClick()} />;

    let nextBtnLabel =
      this.state.index < this.state.navSteps.length
        ? defaultNextLabel
        : this.props.submitLabel.trim().length > 0
        ? this.props.submitLabel
        : defaultSubmitLabel;

    var panelHeading = undefined;
    if (this.state.index <= this.state.steps.length) {
      let stepInfo = this.state.steps[this.state.index - 1];

      panelHeading = (
        <Text styles={panelHeadingTextStyles} variant={panelHeadingTextVariant}>
          {stepInfo.heading}
        </Text>
      );
    }

    //For the Nav control
    var navStepControl = <div />;
    if (this.state.navSteps && this.state.navSteps.length > 0) {
      var selectedNavKey = '';
      if (this.state.index <= this.state.navSteps.length) {
        let item = this.state.navSteps[this.state.index - 1];
        if (item) selectedNavKey = item.key;
      }
      let navGroupParams = [{ links: this.state.navSteps }];

      navStepControl = (
        <Nav
          {...this.props}
          styles={navStyles}
          selectedKey={selectedNavKey}
          groups={navGroupParams}
          onLinkClick={(evt, item) => {
            this._onNavItemClick(item);
          }}
        />
      );
    }

    //Set up the Step Panel
    var stepPanel = '';
    if (this.props.children) {
      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      //Now, we configure the StackItem
      if (childList.length && this.state.index <= childList.length) {
        //Minus 1 for the 0-based array
        let child = childList[this.state.index - 1];

        stepPanel = (
          <StackItem align={stackStretch} overflowY={'auto'} overflowX={'hidden'}>
            {child}
          </StackItem>
        );
      }
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
            background: '#d29200',
            borderRadius: 10,
          }}
        >
          <br />
          <em>
            <strong>Wizard:</strong>
          </em>
          <br />
          Move this marker offscreen
        </div>

        <Modal
          isOpen={this.state.open}
          responsiveMode={ResponsiveMode.xLarge}
          isDarkOverlay={true}
          isBlocking={true}
          dragOptions={undefined}
          onDismiss={() => {
            this._onDismissClicked();
          }}
          className={'merge-component'}
        >
          {/* Modal Display Area */}
          <Stack horizontal={false} horizontalAlign={stackStretch} styles={wizardStackItemStyles}>
            {/* Header and Close button */}
            <StackItem>
              <Stack
                horizontal={true}
                verticalAlign={stackCenter}
                horizontalAlign={stackTop}
                styles={headerStackItemStyles}
                tokens={{
                  padding: 12,
                  childrenGap: 12,
                }}
              >
                {/* Left Side Text */}
                <StackItem
                  tokens={{
                    padding: 0,
                    childrenGap: 6,
                  }}
                  horizontalAlign={stackTop}
                  verticalAlign={stackTop}
                  grow={1}
                >
                  {wizardHeading}
                </StackItem>

                <StackItem>
                  <IconButton
                    iconProps={{ iconName: 'ChromeClose' }}
                    styles={dismissButtonStyles}
                    title={'Close'}
                    onClick={() => this._onDismissClicked()}
                  />
                  {/* <ActionButton
                                        iconName={"ChromeClose"}
                                        tooltip={''}
                                        text={''}
                                        onClick={() => this._onDismissClicked()}
                                    /> */}
                </StackItem>
              </Stack>
            </StackItem>

            {/* Middle Section: Nav + Body */}

            <Stack
              styles={bodyStackStyles}
              horizontal={true}
              grow={true}
              horizontalAlign={stackStretch}
              verticalFill={true}
              tokens={{
                padding: 0,
                childrenGap: 0,
              }}
            >
              {/* Nav: Display for the Steps */}

              <StackItem styles={navStackStyles} verticalFill={true} grow={false}>
                <Stack grow={false} verticalFill={true}>
                  {navStepControl}
                </Stack>
              </StackItem>

              {/* Body Section - Right Side */}

              <StackItem styles={bodyPanelStyle} horizontal={true} horizontalAlign={stackStretch} grow={true}>
                <Stack
                  tokens={{
                    childrenGap: 24,
                    padding: 24,
                  }}
                  horizontal={false}
                  grow={true}
                >
                  <StackItem horizontalAlign={stackStretch}>{panelHeading}</StackItem>

                  <StackItem verticalFill={true} grow={false} styles={bodyScrollRegionStyles}>
                    {/* Children Area for each panel */}

                    {stepPanel}
                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>

            {/* Footer Button Area */}
            <Stack
              horizontal={true}
              verticalAlign={stackCenter}
              horizontalAlign={stackStretch}
              styles={footerStackItemStyles}
              tokens={{
                padding: 12,
                childrenGap: 24,
              }}
            >
              {/* Left Side Help Button */}
              <StackItem
                tokens={{
                  padding: 0,
                  childrenGap: 6,
                }}
                horizontalAlign={stackTop}
                verticalAlign={stackCenter}
                grow={3}
              >
                {helpBtn}
              </StackItem>

              <Stack
                tokens={{
                  padding: 0,
                  childrenGap: 24,
                }}
                horizontal={true}
                verticalAlign={stackCenter}
              >
                <Link value={'Cancel'} href={''} onClick={() => this._onCancelClick()} />
                {backBtn}
                <Button primary={true} text={nextBtnLabel} onClick={() => this._onNextClick()} />
              </Stack>
            </Stack>
          </Stack>
        </Modal>
      </div>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Wizard.propTypes = {
  /**
   * Don't show this prop in the UXPin Editor.
   * @uxpinignoreprop
   * @uxpindescription Contents for the main body of the control.
   * @uxpinpropname Right Contents
   */
  children: PropTypes.node,

  /**
   * @uxpindescription Whether to display the Wizard
   */
  show: PropTypes.bool,

  /**
   * @uxpindescription The text to be displayed in the header of the control
   * @uxpinpropname Title
   */
  title: PropTypes.string,

  /**
   * @uxpinignoreprop
   * @uxpindescription The 1-based index value of the Steps Navigation control to be shown as selected by default.
   * @uxpinpropname Index
   */
  selectedIndex: PropTypes.number,

  /**
   * @uxpindescription The list of steps in the nav. Put each item on a separate line.
   * @uxpinpropname Items
   * @uxpincontroltype codeeditor
   */
  steps: PropTypes.string,

  /**
   * @uxpindescription The text to be displayed in the Submit button on the final step.
   * @uxpinpropname Submit Label
   */
  submitLabel: PropTypes.string,

  /**
   * @uxpindescription Whether to display the Help Button
   * @uxpinpropname Show Help Button
   */
  showHelp: PropTypes.bool,

  /**
   * @uxpindescription Whether to hide the Wizard immediately when the user hits the Cancel  link. If False, then the Wizard must be closed by manually setting the Show prop to false.
   * @uxpinpropname  Dismiss on Cancel
   */
  dismissOnCancel: PropTypes.bool,

  /**
   * @uxpindescription Fires when the Submit Button is clicked.
   * @uxpinpropname Submit Clicked
   */
  onSubmit: PropTypes.func,

  /**
   * @uxpindescription Fires when the Cancel Button is clicked.
   * @uxpinpropname Cancel Clicked
   */
  onCancel: PropTypes.func,

  /**
   * @uxpindescription Fires when the Help Button is clicked.
   * @uxpinpropname Help Clicked
   */
  onHelp: PropTypes.func,

  /**

     * @uxpindescription Fires when the Wizard is dismissed using the Close buttons.
     * @uxpinpropname Dismissed
     */
  dismiss: PropTypes.func,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Wizard.defaultProps = {
  show: false,
  title: 'Wizard',
  steps: defaultNavItems,
  selectedIndex: 1,
  dismissOnCancel: true,
  submitLabel: defaultSubmitLabel,
  showHelp: true,
};

export { Wizard as default };
