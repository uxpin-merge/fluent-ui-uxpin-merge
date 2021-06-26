import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Overlay as FOverlay } from '@fluentui/react/lib/Overlay';




class Overlday extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         open: false
      }
   }

   set() {
      var isOpen = false;

      if (this.props.show) {
         isOpen = true;
      }

      this.setState(
         { open: isOpen }
      )
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {

      if (
         prevProps.show !== this.props.show
      ) {
         this.set();
      }
   }

   _onDismiss() {
      //Set the control to not open to dismiss it.
      //We have to set the state and prop twice.
      if (this.isBlocking)
         return;

      this.setState(
         { open: false }
      )

      this.props.show = false;

      //Notify any UXPin listeners
      if (this.props.dismiss) {
         this.props.dismiss(false);
      }
   }

   render() {



      return (
         <>
            <div  //A visual aid for the designer to see in UXPin
               style={{
                  width: '100px',
                  height: '100px',
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                  background: "green",
                  borderRadius: 10
               }}><br /><em><strong>Overlay:</strong></em><br />Move this marker offscreen</div>

            {this.state.open && (
               <FOverlay
                  {...this.props}
                  aria-hidden={true}
                  isDarkThemed={this.props.isDark}
                  onClick={() => { this._onDismiss() }}
               />
            )}

         </>

      );
   }
};


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Coachmark.propTypes = {

   /**
    * @uxpindescription Whether to display the Overlay 
    * @uxpinpropname Show
    */
   show: PropTypes.bool,

   /**
    * @uxpindescription Whether to the Overlay is dark rather than light 
    * @uxpinpropname Is Dark
    */
   isDark: PropTypes.bool,

   /**
    * @uxpindescription If true, clicking on the Overlay does nothing. If false, clicking on the Overlay dismisses is.  
    * @uxpinpropname Is Blocking
    */
   isBlocking: PropTypes.bool,

   /**
    * @uxpindescription Fires when the control is dismissed
    * @uxpinpropname Dismiss
    */
   dismiss: PropTypes.func,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Overlday.defaultProps = {
   show: true,
   isDark: false,
   isBlocking: false,
};


export { Overlday as default };