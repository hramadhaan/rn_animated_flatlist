import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {HomeNavigator} from './MovieNavigator';

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
