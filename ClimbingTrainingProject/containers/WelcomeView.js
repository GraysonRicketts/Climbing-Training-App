/**
 * View the user sees when first opening app
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class WelcomeView extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to a climbing training app!</Text>

        <Button
          title='Log training session'
          onPress={pushTrainingSessionView.bind(this, this.props.navigation)}
        ></Button>

        <Button
          title='Profile'
          onPress={pushProfileView.bind(this, this.props.navigation)}
        ></Button>

        <Button
          title='Stats'
          onPress={pushStatsView.bind(this, this.props.navigation)}
        ></Button>

        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

function pushTrainingSessionView(navigation) {
  navigation.push('TrainingSession');
}

function pushProfileView(navigation) {
  navigation.push('Profile');
} 

function pushStatsView(navigation) {
  navigation.push('Stats');
}