import * as React from 'react';
import Card from '../Card';
import CardHeader from '../../CardHeader/CardHeader';
import CardBody from '../../CardBody/CardBody';
import CardFooter from '../../CardFooter/CardFooter';
import Text from '../../Text/Text';
import ToggleButton from '../../ToggleButton/ToggleButton';
import ActionButton from '../../ActionButton/ActionButton';


//Body
const instructions = 'Add any Merge control to the CardBody';

//Footer
const text = "View";
const iconName = "Eye";


export default (
    <Card uxpId="card1" style={{ width: '100%' }} >
        <CardHeader uxpId="cardheader1" />
        <CardBody uxpId="cardbody1" >
            <Text uxpId="text1" value={instructions} />
        </CardBody>
        <CardFooter uxpId="cardfooter1" addSpanner={true} spannerIndex={2} >
            <ToggleButton uxpId="togglebutton1" />
            <ActionButton uxpId="actionbutton1" text={text} iconName={iconName} />
        </CardFooter>
    </Card>
);
