/**
 * App starting point
 * 
 * @format
 * @flow
 */
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeView from './containers/WelcomeView';
import ProfileView from './containers/ProfileView';
import PreviousSessionsView from './containers/PreviousSessionsView';
import StatsView from './containers/StatsView';
import TrainingSessionView from './containers/TrainingSessionView';
import Button from './components/Button';

const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeView
    },
    TrainingSession: {
      screen: TrainingSessionView
    },
    PreviousSessions: {
      screen: PreviousSessionsView
    },
    Stats: {
      screen: StatsView
    },
    Profile: {
      screen: ProfileView
    }
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default createAppContainer(MainStack);