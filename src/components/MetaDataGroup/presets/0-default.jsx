import * as React from 'react';
import MetaDataGroup from '../MetaDataGroup';
import MetaDataPair from '../../MetaDataPair/MetaDataPair';
import Text from '../../Text/Text';


const instructions1 = 'Delete or modify these default MetaDataPairs.';
const instructions2 = 'Add any Merge control to the right side of a MetaDataPair.';

export default (
    <MetaDataGroup uxpId="metadatagroup1">
        <MetaDataPair uxpId="metadatapair1" >
            <Text uxpId="text1" value={instructions1} />
        </MetaDataPair>
        <MetaDataPair uxpId="metadatapair1" >
            <Text uxpId="text1" value={instructions2} />
        </MetaDataPair>
    </MetaDataGroup>
);