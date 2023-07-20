import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal as FModal } from '@fluentui/react/lib/Modal';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import ActionButton from '../ActionButton/ActionButton';

const _dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
};

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  set() {
    var isOpen = this.props.show ? true : false;

    this.setState({ open: isOpen });
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
    //We have to set the state and prop twice.

    this.setState({ open: false });

    this.props.show = false;
  }

  _onDismissClicked() {
    //Notify UXPin that the Close icon has been clicked on.
    if (this.props.dismiss) {
      this.props.dismiss();
    }

    this.dismissControl();
  }

  render() {
    //if Header Text is defined
    var headerTxt = '';
    if (this.props.title) {
      headerTxt = (
        <Text variant="xLarge" block>
          {this.props.title.trim()}
        </Text>
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
            background: '#003087',
            borderRadius: 10,
          }}
        >
          <br />
          <em>
            <strong>Modal:</strong>
          </em>
          <br />
          Move this marker offscreen
        </div>

        <FModal
          isOpen={this.state.open}
          isDarkOverlay={this.props.darkOverlay}
          isBlocking={this.props.blocking}
          dragOptions={this.props.draggable ? _dragOptions : undefined}
          onDismiss={() => {
            this._onDismissClicked();
          }}
          className={'merge-component'}
        >
          {/* Modal Display Area */}
          <Stack horizontalAlign={'stretch'}>
            {/* Header and Close button */}
            <Stack
              horizontal={true}
              verticalAlign={'center'}
              horizontalAlign={'start'}
              tokens={{
                padding: 12,
                childrenGap: 12,
              }}
            >
              {/* Left Side Text */}
              <Stack
                tokens={{
                  padding: 0,
                  childrenGap: 6,
                }}
                horizontalAlign={'start'}
                verticalAlign={'start'}
                grow={1}
              >
                {headerTxt}
              </Stack>

              <Stack.Item>
                <ActionButton iconName="ChromeClose" tooltip="Close" text="" onClick={() => this._onDismissClicked()} />
              </Stack.Item>
            </Stack>

            {/* Children Area */}
            {this.props.children && (
              <Stack
                tokens={{
                  childrenGap: 12,
                  padding: 12,
                }}
                horizontalAlign={'stretch'}
                verticalAlign={'start'}
              >
                {this.props.children}
              </Stack>
            )}
          </Stack>
        </FModal>
      </div>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Modal.propTypes = {
  /**
   * Don't show this prop in the UXPin Editor.
   * @uxpinignoreprop
   * @uxpindescription Contents for the main body of the control.
   * @uxpinpropname Right Contents
   */
  children: PropTypes.node,

  /**
   * @uxpindescription Whether to display the Dialog
   */
  show: PropTypes.bool,

  /**
   * @uxpindescription The text to be displayed in the header of the control
   * @uxpinpropname Title
   */
  title: PropTypes.string,

  /**
   * @uxpindescription Whether the user may drag around the dialog
   */
  draggable: PropTypes.bool,

  /**
   * @uxpindescription Whether the user may click off the dialog to dismiss it, or must click on a button instead
   */
  blocking: PropTypes.bool,

  /**
   * @uxpindescription Whether the to show a dark overlay while the dialog is displayed
   * @uxpinpropname Dark Overlay
   */
  darkOverlay: PropTypes.bool,

  /**
   * @uxpindescription Fires when the dialog is dismissed any way EXCEPT clicking on the Primary or Secondary buttons
   * @uxpinpropname Dismissed
   */
  dismiss: PropTypes.func,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Modal.defaultProps = {
  show: true,
  title: 'Basic Modal',
  draggable: false,
  darkOverlay: true,
  blocking: false,
};

export { Modal as default };
