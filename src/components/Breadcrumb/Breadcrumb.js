import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Breadcrumb as FBreadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { getTokens } from '../_helpers/parser';



const defaultItems = `Home|http://www.uxpin.com
Examples|https://www.uxpin.com/examples/
Accordian|https://www.uxpin.com/examples/accordion`;



class Breadcrumb extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         _items: [],
         _selectedIndex: undefined,
      }
   }

   set() {
      let list = [];

      this.setState({
         items: list,
      })
   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.items !== this.props.items) {
         this.set();
      }
   }

   render() {

      return (
         <></>
      );
   }

};

/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Breadcrumb.propTypes = {};

/**
* Set the default values for this control in the UXPin Editor.
*/
Breadcrumb.defaultProps = {

};


export { Breadcrumb as default };