/**
 * App starting point
 * 
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeView from './containers/WelcomeView';
import ProfileView from './containers/ProfileView';
import PreviousSessionsView from './containers/PreviousSessionsView';
import StatsView from './containers/StatsView';
import TrainingSessionView from './containers/TrainingSessionView';
import ReportBugView from './containers/customization/ReportBugView';
import SendSuggestionView from './containers/customization/SendSuggestionView';
import SettingsView from './containers/customization/SettingsView';


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
    },
    ReportBug: {
      screen: ReportBugView
    },
    SendSuggestion: {
      screen: SendSuggestionView
    },
    Settings: {
      screen: SettingsView
    }
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default createAppContainer(MainStack);