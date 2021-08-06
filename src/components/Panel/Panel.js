import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Panel as FPanel, PanelType } from '@fluentui/react/lib/Panel';



// const Panel = () => {
//   const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
// }

class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
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
    this.setState({
      isOpen: false,
    });

    if (this.dismiss) {
      this.dismiss(false);
    }
  }

  render() {

    return (
      <div>
        <FPanel
          {...this.props}
          headerText={this.props.headerText}
          isOpen={this.state.isOpen}
          onDismiss={() => this._onDismiss()}
          closeButtonAriaLabel="Close"
        >
          <p>Content goes here.</p>
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

}

export { Panel as default };
