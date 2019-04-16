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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  climberGuy: {
    fontSize: 100
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    color: '#444',
    margin: 10,
    marginBottom: 90
  },
  buttonSeparator: {
    marginBottom: 40,
  }
});

class WelcomeView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.climberGuy}>🧗‍♂️</Text>
        <Text style={styles.header}>Log and view your climbs</Text>

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
}

export default WelcomeView;