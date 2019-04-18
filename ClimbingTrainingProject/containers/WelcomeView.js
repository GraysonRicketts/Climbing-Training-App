/**
 * View the user sees when first opening app
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';

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
  buttonSeparator: {
    height: 40,
  }
});

class WelcomeView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title='Log session'
          onPress={this._pushTrainingSessionView.bind(this)}
        />

        <View style={styles.buttonSeparator} />

        {/* TODO: add profile
        
        <Button
          title='Profile'
          onPress={this._pushProfileView.bind(this)}
        /> */}

        <Button
          title='Previous climbs'
          onPress={this._pushStatsView.bind(this)}
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
      title: '‍‍🧗‍♀️ Welcome *'
    }
  }
}

export default WelcomeView;