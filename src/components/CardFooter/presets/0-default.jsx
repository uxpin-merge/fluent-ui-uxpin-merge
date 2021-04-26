import * as React from 'react';
import CardFooter from '../CardFooter';
import ToggleButton from '../../ToggleButton/ToggleButton';
import ActionButton from '../../ActionButton/ActionButton';




const text = "View";
const iconName = "Eye";


export default (
    <CardFooter uxpId="cardfooter1" addSpanner={true} spannerIndex={2} >
        <ToggleButton uxpId="togglebutton1" />
        <ActionButton uxpId="actionbutton1" text={text} iconName={iconName} />
    </CardFooter>
);
