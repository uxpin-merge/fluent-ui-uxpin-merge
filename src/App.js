import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1>Hello Fluent UI!</h1>
      <div className="btns-group">
        <DefaultButton text="default button" />
        <PrimaryButton text="primary button" />
      </div>
    </div>
  );
}
