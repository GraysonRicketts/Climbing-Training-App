/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { 
  StyleSheet, 
  ScrollView,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BarChart from './../components/statistics/BarChart';
import Statistic from '../components/statistics/Statistic';
import CLIMB_TYPES from './../enums/ClimbingTypes';
import FRENCH_RATINGS from './../enums/FrenchRatings';
import YOSEMITE_RATINGS from './../enums/YosemiteRatings';
import HUECO_RATINGS from './../enums/HuecoRatings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  statistic: {
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 10,
    color: '#111'
  },
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

    // TODO: # of onsites
    // TODO: ranking how it felt / comments
    // TODO: types (e.g. slab, crimp, overhang)
    // TODO: personal tags
    render() {
      const avgNumPerSession = this._calculateAvgNumPerSession();
      const percentSent = this._calculatePercentSent();
      const countsByGrade = this._getClimbCountsByGrade(); 
      let distKeyId = 0;

      return (
        <ScrollView style={styles.container}>
          <Statistic title='Average number of climbs a session'>
            <Text style={styles.statistic}>
                {avgNumPerSession ? avgNumPerSession : 'No data'}
            </Text>
          </Statistic>

          <Statistic title='Percent of successful climbs'>
            <Text style={styles.statistic}>
                {percentSent ? percentSent : 'No data'}
            </Text>
          </Statistic>
          {
            countsByGrade ?
            countsByGrade.map(climbs => 
              <Statistic 
                title={this._getClimbingTypeName(climbs.type)}
                key={distKeyId++}
              >
                <BarChart 
                  data={climbs.data}
                />
              </Statistic>) : null
          }
        </ScrollView>
      );
    }

    _getClimbingTypeName(climbingType) {
      switch(climbingType) {
          case CLIMB_TYPES.HUECO:
              return 'Hueco';
          case CLIMB_TYPES.YOSEMITE:
              return 'Yosemite';
          case CLIMB_TYPES.FRENCH:
              return 'French';
      };
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

      const percentSent = (numSent / totalNum) * 100;
      const formattedPercentSent = `% ${percentSent.toFixed(2)}`
      return formattedPercentSent;
    }

    _getClimbCountsByGrade() {
      if (!this.state.climbingSessions) {
        return undefined;
      }

      let countByGrades = [];
      Object.values(CLIMB_TYPES).forEach((type) => {
        const grades = this._getGradesForType(type);

        let climbData = {};
        grades.forEach((grade) => {
          climbData[grade] = undefined
        });
        climbData = this._getCountOfClimbsPerGrade(type, climbData);
        if (!climbData) {
          return undefined;
        }

        countByGrades.push({type, data: climbData});
      });

      return countByGrades;
    }

    _getCountOfClimbsPerGrade(typeOfClimb, climbData) {
      const climbingSessions = this.state.climbingSessions;
      let dataExists = false;
      for (let n = 0; n < climbingSessions.length; n++) {
        let session = climbingSessions[n][1];
        
        session = session.filter(climb => climb.route.climbType === typeOfClimb);
        if (!session) {
          return undefined;
        }
  
        session.forEach((climb) => {
            const difficulty = climb.route.difficulty;
            if (climbData[difficulty]) {
              climbData[difficulty] += 1;
            }
            else {
              dataExists = true;
              climbData[difficulty] = 1;
            }
          });
      }
  
      if (!dataExists) {
        return null;
      }

      return climbData;
    }
  
    _getGradesForType(typeOfClimb) {
      let grades = [];

      if (typeOfClimb === CLIMB_TYPES.HUECO) {
        grades = Object.keys(HUECO_RATINGS);
      }
      else if (typeOfClimb === CLIMB_TYPES.YOSEMITE) {
        grades = Object.keys(YOSEMITE_RATINGS);
      }
      else if (typeOfClimb === CLIMB_TYPES.FRENCH) {
        grades = Object.keys(FRENCH_RATINGS);
      }
  
      return grades;
    }
}

  export default StatsView;