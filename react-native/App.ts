/**
 * App starting point
 */

import { 
  createStackNavigator, 
  createAppContainer
} from 'react-navigation';
import WelcomeView from './containers/WelcomeView';
import CustomizationView from './containers/CustomizationView';
import PreviousSessionsView from './containers/PreviousSessionsView';
import StatsView from './containers/StatsView';
import TrainingSessionView from './containers/TrainingSessionView';
import ReportBugView from './containers/settings/ReportBugView';
import SendSuggestionView from './containers/settings/SendSuggestionView';
import SettingsView from './containers/settings/SettingsView';
import AboutView from './containers/settings/AboutView';


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
      screen: CustomizationView
    },
    ReportBug: {
      screen: ReportBugView
    },
    SendSuggestion: {
      screen: SendSuggestionView
    },
    Settings: {
      screen: SettingsView
    },
    About: {
      screen: AboutView
    }
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default createAppContainer(MainStack);