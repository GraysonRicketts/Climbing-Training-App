/**
 * View the user sees when first opening app
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
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
    backgroundColor: '#7ED7D7',
    margin: 50,
    padding: 20
  }
});

class WelcomeView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title='Log session'
          onPress={this._pushTrainingSessionView.bind(this)}
          style={styles.navigationButton}
          fontSize={30}
          fontColor={'#020202'}
        />

        <Button
          title='Previous climbs'
          onPress={this._pushStatsView.bind(this)}
          style={styles.navigationButton}
          fontSize={30}
          fontColor={'#020202'}
        />

        <Text style={styles.explanatoryText}>* This app is currently under development. Expect frequent changes and possible loss of data.</Text>
      </View>
    );
  }
  
  _pushTrainingSessionView() {
    this.props.navigation.push('TrainingSession');
  }
  
  _pushProfileView() {
    this.props.navigation.push('Profile');
  } 
  
  _pushStatsView() {
    this.props.navigation.push('Stats');
  }

  static navigationOptions(navigationState) {
    return {
      title: '‍‍🧗‍♀️ Welcome *',
      // TODO: Add profile + settings button in header
    }
  }
}

export default WelcomeView;