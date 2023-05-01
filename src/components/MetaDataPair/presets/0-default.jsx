import * as React from 'react';
import MetaDataPair from '../MetaDataPair';
import Text from '../../Text/Text';

const instructions = 'Add any Merge control to the right side of a MetaDataPair';

export default (
  <MetaDataPair uxpId="metadatapair1">
    <Text uxpId="text1" textValue={instructions} />
  </MetaDataPair>
);
