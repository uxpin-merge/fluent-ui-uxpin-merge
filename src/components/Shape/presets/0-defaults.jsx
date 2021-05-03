import * as React from 'react';
import Shape from '../Shape';
import Text from '../../Text/Text';



const instructions = "Add any Merge control to Shape. It's a Vertical Stack with advanced styling features.";

export default (
    <Shape uxpId="shape1" >
        <Text uxpId="text1" value={instructions} />
    </Shape>
);