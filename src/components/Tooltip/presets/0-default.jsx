import * as React from 'react';
import Tooltip from '../Tooltip';
import Text from '../../Text/Text';




const instructions = 'Add any Merge control to the Tooltip';

export default (
  <Tooltip uxpId="tooltip1" >
    <Text uxpId="text1" textValue={instructions} />
  </Tooltip>
);
