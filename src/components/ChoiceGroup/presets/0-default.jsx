import * as React from 'react';
import ChoiceGroup from '../ChoiceGroup';

const label = 'Basic ChoiceGroup';
//Leave these left aligned as they show up in UXPin exactly as-is.
const defaultChoices = `Apples
Bananas
"I love you, Grapes!"
Kiwis
Oranges`;

export default <ChoiceGroup uxpId="choicegroup1" label={label} items={defaultChoices} />;
