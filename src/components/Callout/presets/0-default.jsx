import * as React from 'react';
import Callout from '../Callout';
import Text from '../../Text/Text';




const instructions = 'Add any Merge control to the Callout & decide how to trigger it';

export default (
  <Callout uxpId="callout1" >
    <Text uxpId="text1" textValue={instructions} />
  </Callout>
);
