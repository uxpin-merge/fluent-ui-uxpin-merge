import * as React from 'react';
import CommandButton from '../CommandButton';



const defaultIcon = "Add";
const defaultText = "Action Button";
const defaultItems = `icon(Document) Add Document
icon(FileCode) Add Code File
icon(Picture) Add Picture`;



export default (
  <CommandButton
    uxpId="commandbutton1"
    text={defaultText}
    iconName={defaultIcon}
    items={defaultItems}
  />
);
