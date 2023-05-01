import * as React from 'react';
import PeoplePicker from '../PeoplePicker';

const defaultPeople = `Person1
Person2
Person3
Tiffany Green | tgreen@company.com
Abhik Rao | Dir., Product Management
Person6
Person7
Person8
Person9
Person10
Person11
Person12
Person13
Person14
Person15
Person16
Person17
Person18
Person19
Person20`;

export default <PeoplePicker uxpId="peoplepicker1" persons={defaultPeople} />;
