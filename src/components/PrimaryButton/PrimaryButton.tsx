import React from 'react';
import { PrimaryButton as PrimaryButtonM } from '@fluentui/react/lib/Button';

export interface ButtonProps {
  text?: string;
}

function PrimaryButton(props: ButtonProps) {
  return (
    <PrimaryButtonM {...props}>
      {props.text}
    </PrimaryButtonM>
  );
}

export { PrimaryButton as default };
