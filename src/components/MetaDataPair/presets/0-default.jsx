import * as React from 'react';
import MetaDataPair from '../MetaDataPair';
import Text from '../../Text/Text';



const instructions = 'Right side can host any Merge control.';


export default (
    <MetaDataPair uxpId="metadatapair1" >
        <Text uxpId="text1" value={instructions} />
    </MetaDataPair>
);