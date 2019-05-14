import React from 'react';
import { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Button from './../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  climberGuy: {
    fontSize: 100
  },
  explanatoryText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#222',
    position: 'absolute',
    bottom: 20
  },
  navigationButton: {
    backgroundColor: '#AEE5E5',
    margin: 25,
    borderRadius: 45,
    width: '80%'
  },
  buttonIcon: {
    width: 50,
    height: 50
  }
});

interface IWelcomeViewProps {
  navigation: any // TODO: typecheck
}

class WelcomeView extends Component<IWelcomeViewProps> {
  render() {
    const navigationFontSize = 20;
    const navigationFontColor = '#171717';

    return (
      <View style={styles.container}>
        <Button
          title='Log session'
          onPress={this._pushTrainingSessionView.bind(this)}
          style={{ ...styles.navigationButton, backgroundColor: '#6FF18B' }}
          fontSize={navigationFontSize}
          fontColor={navigationFontColor}
        >
          <Image 
            source={require('./../assets/img/save.png')}
            style={{ ...styles.buttonIcon, tintColor: navigationFontColor }}  
          />
        </Button>

        <Button
          title='Previous sessions'
          onPress={this._pushPreviousSessionsView.bind(this)}
          style={styles.navigationButton}
          fontSize={navigationFontSize}
          fontColor={navigationFontColor}
        >
          <Image 
            source={require('./../assets/img/calendar.png')}
            style={styles.buttonIcon}  
          />
        </Button>

        <Button
          title='Statistics'
          onPress={this._pushStatisticsView.bind(this)}
          style={styles.navigationButton}
          fontSize={navigationFontSize}
          fontColor={navigationFontColor}
        >
          <Image 
            source={require('./../assets/img/line-chart.png')}
            style={styles.buttonIcon}  
          />
        </Button>

        <Text style={styles.explanatoryText}>* This app is currently under development. Expect frequent changes and possible loss of data.</Text>
      </View>
    );
  }
  
  _pushTrainingSessionView(): void {
    this.props.navigation.push('TrainingSession');
  }
  
  _pushProfileView(): void {
    this.props.navigation.push('Profile');
  } 
  
  _pushPreviousSessionsView(): void {
    this.props.navigation.push('PreviousSessions');
  }

  _pushStatisticsView(): void {
    this.props.navigation.push('Stats');
  }

  static navigationOptions(navigationState: any): any { // TODO: typecheck
    const { navigation } = navigationState;

    return {
      title: '‍‍🧗‍♀️ Welcome',
      headerRight: <Button 
        title={'⚙️'}
        onPress={() => navigation.navigate('Profile')}
        fontSize={20}
      />
    }
  }
}

export default WelcomeView;