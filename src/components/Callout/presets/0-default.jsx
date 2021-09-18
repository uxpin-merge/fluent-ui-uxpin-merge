import * as React from 'react';
import Callout from '../Callout';
import Text from '../../Text/Text';




const instructions = 'Any Merge control can be the Callout\'s focus';

export default (
  <Callout uxpId="callout1" >
    <Text uxpId="text1" textValue={instructions} />
  </Callout>
);
