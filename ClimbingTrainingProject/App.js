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
import AddContainerView from './containers/AddViews/AddContainerView';


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
  
  const RootStack = createStackNavigator(
    {
        Main: {
          screen: MainStack
        },
        AddModal: {
          screen: AddContainerView
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
  );

export default createAppContainer(RootStack);