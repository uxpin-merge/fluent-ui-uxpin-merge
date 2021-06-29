import * as React from 'react';
import Tooltip from '../Tooltip';
import Text from '../../Text/Text';



const instructions = 'Replace this Text control with any Fluent object';


export default (
  <Tooltip uxpId="tooltip1" >
    <Text uxpId="text1" value={instructions} />
  </Tooltip>
);
