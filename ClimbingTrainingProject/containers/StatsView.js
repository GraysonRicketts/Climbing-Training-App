/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class StatsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
          climbingSessions: []
        }
    }

    componentWillMount() {
      this._getClimbingSessions();
    }

    render() {
        return (
          <View style={styles.container}>
            <Text>lolol</Text>
          </View>
        );
      }

    async _getClimbingSessions() {
      try {
        let sessionKeys = await AsyncStorage.getAllKeys();
        if (!sessionKeys) {
          return undefined;
        }

        let climbingSessions = await AsyncStorage.multiGet(sessionKeys);
        for (let sessionIdx = 0; sessionIdx < climbingSessions.length; sessionIdx++) {
          let sessionInfo = climbingSessions[sessionIdx][1]
          climbingSessions[sessionIdx][1] = JSON.parse(sessionInfo); // Turn string back into climbs object
        }

        this.setState({
          climbingSessions
        })
      }
      catch(error) {
        console.error(error);
      }
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