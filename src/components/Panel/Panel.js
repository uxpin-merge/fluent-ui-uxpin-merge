import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel as PanelM } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

const Panel = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <PanelM
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <p>Content goes here.</p>
      </PanelM>
    </div>
  );
};

Panel.propTypes = {
  /**
   * @uxpinignoreprop hide this from the user
   */
  children: PropTypes.node,
  closeButtonAriaLabel: PropTypes.string,
};


Panel.defaultProps = {
  closeButtonAriaLabel: 'close'
}

export { Panel as default };
