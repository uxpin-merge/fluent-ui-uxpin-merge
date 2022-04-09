import * as React from 'react';
import Pivot from '../Pivot';
import PivotPanel from '../../PivotPanel/PivotPanel';
import Text from '../../Text/Text';



const tab1text = "Tab 1 Contents";
const tab2text = "Tab 2 Contents";
const tab3text = "Tab 3 Contents";
const tab4text = "Tab 4 Contents";

const size = "large";



export default (
  <Pivot uxpId="pivot1" >
    <PivotPanel>
      <Text variant={size} textValue={tab1text} />
    </PivotPanel>
    <PivotPanel>
      <Text variant={size} textValue={tab2text} />
    </PivotPanel>
    <PivotPanel>
      <Text variant={size} textValue={tab3text} />
    </PivotPanel>
    <PivotPanel>
      <Text variant={size} textValue={tab4text} />
    </PivotPanel>
  </Pivot>
);
