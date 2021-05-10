import * as React from 'react';
import TestControl from '../TestControl';
import Text from '../../Text/Text';



const instructions = "Add any Merge control to Shape. It's a Vertical Stack with advanced styling features.";

export default (
    <TestControl uxpId="shape11" >
        <Text uxpId="text1" value={instructions} />
    </TestControl>
);