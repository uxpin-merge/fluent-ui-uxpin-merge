import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DatePicker as DatePickerM } from '@fluentui/react/lib/DatePicker';

const DatePicker = (props) => (
  <DatePickerM {...props} />
);


DatePicker.propTypes = {
  allowTextInput: PropTypes.bool,
};

export { DatePicker as default };
