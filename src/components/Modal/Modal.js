import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal as FModal } from '@fluentui/react/lib/Modal';



const _dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
};



class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }


    set() {
        var isOpen = this.props.show ? true : false;

        this.setState(
            { open: isOpen }
        )
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

        this.setState(
            { open: false }
        )

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

        return (
            <div>
                <div  //A visual aid for the designer to see in UXPin
                    style={{
                        width: '100px',
                        height: '100px',
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "middle",
                        background: '#003087',
                        borderRadius: 10
                    }}><br /><em><strong>Modal:</strong></em><br />Move this marker offscreen</div>

                <FModal
                    maxWidth={getWidthFromSize(this.props.maxWidth)}
                    isOpen={this.state.open}
                    isDarkOverlay={this.props.darkOverlay}
                    isBlocking={this.props.blocking}
                    dragOptions={this.props.draggable ? _dragOptions : undefined}
                    onDismiss={() => { this._onDismissClicked() }}
                >
                    {this.props.children &&
                        <Stack
                            tokens={{
                                childrenGap: 12
                            }}
                            styles={{
                                root: {
                                    marginTop: 12
                                }
                            }}
                        >
                            {this.props.children}
                        </Stack>
                    }
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
     * @uxpindescription The control's title text
     * @uxpinpropname Headline
     */
    title: PropTypes.string,

    /**
     * @uxpindescription Max width for the control
     */
    maxWidth: PropTypes.oneOf([small, medium, large]),

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
    maxWidth: large,
    title: "Basic Modal",
    draggable: false,
    darkOverlay: true,
    blocking: false,
};


export { Modal as default };
