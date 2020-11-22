import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const HomeStack = createSharedElementStackNavigator();

export const HomeNavigator = (props) => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 400,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 400,
              },
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </HomeStack.Navigator>
  );
};
