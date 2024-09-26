/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemeProvider } from '@fluentui/react';

initializeIcons();

export default function UXPinWrapper({ children }) {
  //Link Google fonts
  if (!document.getElementById('fluent-merge-font-DmSans')) {
    let DmSans = document.createElement('link');
    DmSans.setAttribute(
      'href',
      'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'
    );
    DmSans.setAttribute('rel', 'stylesheet');
    DmSans.setAttribute('id', 'fluent-merge-font-DmSans');
    document.head.appendChild(DmSans);
  }

  if (!document.getElementById('fluent-merge-font-SpaceGrotesk')) {
    let SpaceGrotesk = document.createElement('link');
    SpaceGrotesk.setAttribute(
      'href',
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap'
    );
    SpaceGrotesk.setAttribute('rel', 'stylesheet');
    SpaceGrotesk.setAttribute('id', 'fluent-merge-font-SpaceGrotesk');
    document.head.appendChild(SpaceGrotesk);
  }

  //Create FluentUi Theme
  const appTheme = {
    defaultFontStyle: { fontFamily: 'DM Sans' },
    fonts: {
      small: {
        fontSize: '11px',
      },
      medium: {
        fontSize: '13px',
      },
      large: {
        fontSize: '20px',
        fontWeight: 'semibold',
      },
      xLarge: {
        fontFamily: 'Space Grotesk',
        fontSize: '100px',
        fontWeight: 'semibold',
      },
    },
    palette: {
      themePrimary: 'red',
    },
  };

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
}
