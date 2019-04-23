/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AverageNumber from './../components/statistics/AverageNumber'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class StatsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
          climbs: []
        }
    }

    componentWillMount() {
      this._getClimbingSessions();
    }

    // TODO: Distribution of climbs (sent vs. not sent)
    // TODO: # of onsites
    // TODO: ranking how it felt / comments
    // TODO: types (e.g. slab, crimp, overhang)
    // TODO: personal tags
    render() {
      const avgNumPerSession = this._calculateAvgNumPerSession();
      const percentSent = this._calculatePercentSent();

      return (
        <View style={styles.container}>
          <AverageNumber 
            title='Average number of climbs a session'
            statistic={avgNumPerSession}
          />

          <AverageNumber 
            title='Percent of successful climbs'
            statistic={`${percentSent} %`}
          />
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

    _calculateAvgNumPerSession() {
      if (!this.state.climbingSessions) {
        return undefined;
      }

      let totalNum = 0;
      let numberOfSessions = this.state.climbingSessions.length;
      for (let n = 0; n < numberOfSessions; n++) {
        totalNum += this.state.climbingSessions[n][1].length;
      }

      const avgNumPerSession = totalNum / numberOfSessions;
      return avgNumPerSession;
    }
    
    _calculatePercentSent() {
      if (!this.state.climbingSessions) {
        return undefined;
      }

      let totalNum = 0;
      let numSent = 0;
      let numberOfSessions = this.state.climbingSessions.length;
      for (let n = 0; n < numberOfSessions; n++) {
        const session = this.state.climbingSessions[n][1];
        totalNum += session.length;

        session.forEach((climb) => {
          if (climb.sentIt) {
            numSent++;
          }
        });
      }

      const percentSent = Math.round((numSent / totalNum) * 10000) / 100;
      return percentSent;
    }
}

  export default StatsView;