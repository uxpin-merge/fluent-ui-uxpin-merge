import * as React from 'react';
import Dropdown from '../Dropdown';

const label = 'Dropdown';
const placeholder = '- Select -';
const defaultItems = `Fruit
* Apples
* Bananas
* I love you, Grapes!
divider
Grains
Vegetables`;

export default <Dropdown uxpId="dropdown1" label={label} placeholder={placeholder} items={defaultItems} />;
