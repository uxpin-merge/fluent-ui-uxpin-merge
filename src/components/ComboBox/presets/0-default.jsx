import * as React from 'react';
import ComboBox from '../ComboBox';



const label = 'ComboBox';
const placeholder = '- Select -';

const defaultItems = `Fruit
* Apples
* Bananas
* "I love you, Grapes!"
divider
Grains
Vegetables`;



export default (
  <ComboBox
    uxpId="ComboBox1"
    label={label}
    placeholder={placeholder}
    items={defaultItems}
  />
);
