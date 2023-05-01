import * as React from 'react';
import Persona from '../Persona';

const defaultPersonaUrl =
  'https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/person04.jpg';
const initials = 'SC';
const name = 'Sydney Coleman';
const role = 'Financial Analyst II';
const status = 'In a meeting';
const optional = 'Available at 4:00 PM PST';

export default (
  <Persona
    uxpId="persona1"
    imageUrl={defaultPersonaUrl}
    initials={initials}
    name={name}
    role={role}
    status={status}
    optional={optional}
  />
);
