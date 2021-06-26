import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from '../Link/Link';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { UxpDateTimeUtils } from '../_helpers/uxpdatetimeutils';




class Timestamp extends React.Component {

   constructor(props) {
      super(props);

      let dt = new Date();

      this.state = {
         displayDate: dt,
      }
   }

   set() {
      //Let's see if we can parse a real date
      var dt = UxpDateTimeUtils.parseDate(this.props.calDate);
      dt = dt ? dt : new Date();

      this.setState(
         { displayDate: dt }
      )
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if ((prevProps.calDate !== this.props.calDate) ||
         (prevProps.showDate !== this.props.showDate) ||
         (prevProps.showTime !== this.props.showTime)) {
         this.set();
      }
   }

   _onLinkClick() {

      // if (this.props.disabled)
      //     return;

      // //Raise this event to UXPin. We'll send them the HREF value in case they can catch it.
      // if (this.props.onLinkClick) {
      //     this.props.onLinkClick(this.props.linkHref);
      // }
   }

   render() {

      let fullDT = UxpDateTimeUtils.getFullDateTimeAdvanced(this.state.displayDate, false, this.props.showSeconds);
      let utc = "UTC: " + UxpDateTimeUtils.getUtcString(this.state.displayDate);
      let epoch = "Epoch: " + UxpDateTimeUtils.getEpochSeconds(this.state.displayDate);

      let ttContents = (
         <div style={{ lineHeight: 1.5, padding: 6 }}>
            <p>{fullDT} <br /></p>
            <p>{utc} <br /></p>
            <p>{epoch}</p>
         </div>
      );

      //Get the formatted string for the control
      var linkText = "";
      if (this.props.showDate && !this.props.showTime) {
         linkText = UxpDateTimeUtils.getFormattedDate(this.state.displayDate);
      }
      else if (!this.props.showDate && this.props.showTime) {
         linkText = UxpDateTimeUtils.getFormattedTimeAdvanced(this.state.displayDate, !this.props.is24, this.props.showSeconds);
      }
      else {
         linkText = UxpDateTimeUtils.getFormattedDateTimeAdvanced(this.state.displayDate, !this.props.is24, this.props.showSeconds);
      }

      const ttTargetID = _.uniqueId('ttTarget_');
      const tooltipID = _.uniqueId('tooltip_');
      const ttProps = {
         gapSpace: 2,
         target: `#${ttTargetID}`,
      };

      return (
         <>
            <TooltipHost
               content={ttContents}
               id={tooltipID}
               directionalHint={DirectionalHint.topLeftEdge}
               closeDelay={500}
               calloutProps={ttProps}
            >
               <Link
                  {...this.props}
                  value={linkText}
                  linkHref={''}
                  italic={this.props.italic}
                  id={ttTargetID}
                  aria-describedby={tooltipID}
               />
            </TooltipHost>
         </>
      );
   }
};


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Timestamp.propTypes = {

   /**
    * @uxpindescription Enter the date and time. Dates: Feb 8, 2020 or 2/6/2020. Times: 4:20 pm or 16:20. 
    * @uxpinpropname Date
    */
   calDate: PropTypes.string,

   /**
    * @uxpindescription Whether to display the date component
    * @uxpinpropname Show Date
    */
   showDate: PropTypes.bool,

   /**
    * @uxpindescription Whether to display the time component
    * @uxpinpropname Show Time
    */
   showTime: PropTypes.bool,

   /**
    * @uxpindescription Whether to display the time component with seconds
    * @uxpinpropname Show Seconds
    */
   showSeconds: PropTypes.bool,

   /**
    * @uxpindescription Whether to display the time using 24-hour rather than 12 hour with am/pm
    * @uxpinpropname 24-hr Time
    */
   is24: PropTypes.bool,

   /**
   * @uxpindescription To apply bold formatting
   */
   bold: PropTypes.bool,

   /**
    * @uxpindescription To apply italic formatting
    */
   italic: PropTypes.bool,

   /**
   * @uxpindescription Text alignment
   */
   align: PropTypes.oneOf(['left', 'center', 'right']),

   /**
    * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
    */
   size: PropTypes.oneOf([
      'tiny',
      'xSmall',
      'small',
      'smallPlus',
      'medium',
      'mediumPlus',
      'large',
      'xLarge',
      'xxLarge',
      'mega',
   ]),

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Timestamp.defaultProps = {
   calDate: "Jul 1, 2021, 4:20 pm",
   showDate: true,
   showTime: true,
   showSeconds: false,
   is24: false,
   align: 'left',
   size: 'medium',
   bold: false,
   italic: false,
};


export { Timestamp as default };

