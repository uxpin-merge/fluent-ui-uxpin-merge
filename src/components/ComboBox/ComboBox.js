import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ComboBox as FComboBox } from '@fluentui/react/lib/ComboBox';
import {
  IComboBox,
  SelectableOptionMenuItemType,
} from '@fluentui/react/';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import * as UXPinParser from '../_helpers/UXPinParser';

const options = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];
// Optional styling to make the example look nicer
// const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
// const buttonStyles: Partial<IButtonStyles> = { root: { display: 'block', margin: '10px 0 20px' } };

class ComboBox extends React.Component {

  constructor(props) {
    super(props);

    //const comboBoxRef = React.useRef < IComboBox > (null);
    this._targetElm = React.createRef();

    this.state = {
      //default must be undefined
      _selectedIndex: undefined,
      _selectedIndices: [],
      items: [],
      isDirty: false,
    }
  }

  render() {
    const onOpenClick = React.useCallback(() => this._targetElm.current?.focus(true), []);

    return (
      <div>
        <FComboBox
          componentRef={this._targetElm}
          defaultSelectedKey={"C"}
          label={"Basic single-select ComboBox"}
          options={options}
        />
        <PrimaryButton text="Open first ComboBox" onClick={onOpenClick} />

        <FComboBox
          defaultSelectedKey={"C"}
          label={"Basic multi-select ComboBox"}
          multiSelect={true}
          options={options}
        />
      </div >
    )
  }
};

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
ComboBox.propTypes = {
  dropdownMaxWidth: PropTypes.number,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ComboBox.defaultProps = {
  dropdownMaxWidth: 100,
};


export { ComboBox as default };
