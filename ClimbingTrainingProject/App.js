/**
 * App starting point
 * 
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeView from './containers/WelcomeView';
import ProfileView from './containers/ProfileView';
import StatsView from './containers/StatsView';
import TrainingSessionView from './containers/TrainingSessionView';
import AddClimbView from './containers/AddClimbView';


const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeView
    },
    TrainingSession: {
      screen: TrainingSessionView
    },
    Stats: {
      screen: StatsView
    },
    Profile: {
      screen: ProfileView
    },
  },
  {
    initialRouteName: 'Welcome'
  }
  );

export default createAppContainer(MainStack);