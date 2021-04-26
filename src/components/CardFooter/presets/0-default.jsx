import * as React from 'react';
import CardFooter from '../CardFooter';
import ActionButton from '../../ActionButton/ActionButton';



const text = "View";
const iconName = "Eye";


export default (
    <CardFooter uxpId="cardfooter1" addSpanner={true} spannerIndex={1} >
        <ActionButton uxpId="actionbutton1" text={text} iconName={iconName} />
    </CardFooter>
);
