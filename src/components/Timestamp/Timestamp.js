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

      let utc = "UTC: " + UxpDateTimeUtils.getUtcString(this.state.displayDate);

      console.log(utc);

      let epoch = "Epoch: " + UxpDateTimeUtils.getEpochSeconds(this.state.displayDate);

      console.log(epoch);

      let ttContents = (
         <div>
            <p>{utc}</p>
            <p>{epoch}</p>
         </div>
      );

      let linkText = (showDate && !showTime) ? UxpDateTimeUtils.getFormattedDate(this.state.displayDate) :
         (!showDate && showTime) ? UxpDateTimeUtils.getFormattedTime(this.state.displayDate) :
            UxpDateTimeUtils.getFormattedDateTime(this.state.displayDate);

      console.log("Link text: " + linkText);

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
    * @uxpindescription Set the date in the control using one of these formats: Feb 8, 2020 -OR- 2/6/2020.
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
   calDate: "Jul 1, 2021",
   showDate: true,
   showTime: true,
   align: 'left',
   size: 'medium',
   bold: false,
   italic: false,
};


export { Timestamp as default };

