import * as React from 'react';
import ProfileCard from '../ProfileCard';
import ActionButton from '../../ActionButton/ActionButton';
import Card from '../../Card/Card';



export default (
    <Card uxpId="card1" cardPadding={12}>
        <ProfileCard uxpId="profilecard1">
            <ActionButton uxpId="btn1" text="Email" iconName="Mail" />
            <ActionButton uxpId="btn2" text="Call" iconName="Phone" />
            <ActionButton uxpId="btn3" text="Chat" iconName="OfficeChat" />
        </ProfileCard>
    </Card>
);