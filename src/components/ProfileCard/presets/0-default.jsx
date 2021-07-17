import * as React from 'react';
import ProfileCard from '../ProfileCard';
import ActionButton from '../../ActionButton/ActionButton';



const defaultPersonaUrl = "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/person04.jpg"
const initials = 'SC';
const name = 'Sydney Coleman';
const role = 'Financial Analyst II';
const status = '';
const optional = '';
const email = 'scolemand@company.com';



export default (
    <ProfileCard uxpId="profilecard1"
        imageUrl={defaultPersonaUrl}
        initials={initials}
        name={name}
        role={role}
        status={status}
        optional={optional}
        email={email}
    >
        <ActionButton uxpId="btn1" text="Email" iconName="Mail" />
        <ActionButton uxpId="btn2" text="Call" iconName="Phone" />
        <ActionButton uxpId="btn3" text="Chat" iconName="OfficeChat" />
    </ProfileCard>
);