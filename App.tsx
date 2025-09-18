import React from 'react';
import { MainContextProvider } from './app/utils/MainContext';
import { PasswordsContextProvider } from './app/utils/PasswordsContext';
import RootNavigator from './app/views/RootNavigator';

export default function App() {
  return (
    <MainContextProvider>
      <PasswordsContextProvider>
        <RootNavigator />
      </PasswordsContextProvider>
    </MainContextProvider>
  );
}