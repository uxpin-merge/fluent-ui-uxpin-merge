import * as React from 'react';
import Pivot from '../Pivot';
import PivotPanel from '../../PivotPanel/PivotPanel';
import Text from '../../Text/Text';



const tab1text = "Tab 1 ";
const tab2text = "Tab 2 ";
const tab3text = "Tab 3";
const tab4text = "Tab 4";

const size = "large";

export default (
  <Pivot uxpId="pivot1" >
    <PivotPanel>
      <Text variant={size} value={tab1text} />
    </PivotPanel>
    <PivotPanel>
      <Text variant={size} value={tab2text} />
    </PivotPanel>
    <PivotPanel>
      <Text variant={size} value={tab3text} />
    </PivotPanel>
    <PivotPanel>
      <Text variant={size} value={tab4text} />
    </PivotPanel>
  </Pivot>
);
