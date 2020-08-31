import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';
import FullPage from './screens/fullPage';
import Popup from './screens/popup';
import { ProfileProvider } from './store';

const App = () => {
  return (
    <ThemeProvider>
      <ColorModeProvider colorMode="dark">
        <CSSReset />
        <ProfileProvider>
          <Switch>
            <Route exact path="/" component={FullPage} />
            <Route exact path="/popup" component={Popup} />
          </Switch>
        </ProfileProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
