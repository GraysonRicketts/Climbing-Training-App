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
import Distribution from './../components/statistics/Distribution';
import AverageNumber from './../components/statistics/AverageNumber';
import CLIMB_TYPES from './../enums/ClimbingTypes';
import FRENCH_RATINGS from './../enums/FrenchRatings';
import YOSEMITE_RATINGS from './../enums/YosemiteRatings';
import HUECO_RATINGS from './../enums/HuecoRatings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  distributionHeader: {
    fontSize: 23,
    color: '#666'
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
      const distributionTitle = 'Grades climbed';
      const avgNumPerSession = this._calculateAvgNumPerSession();
      const percentSent = this._calculatePercentSent();
      
      const huecoData = this._getBarChartData(CLIMB_TYPES.HUECO);
      const yosemiteData = this._getBarChartData(CLIMB_TYPES.YOSEMITE);
      const frenchData = this._getBarChartData(CLIMB_TYPES.FRENCH);
      const dataByGrade = [huecoData, yosemiteData, frenchData];

      let distKeyId = 0;
      return (
        <ScrollView style={styles.container}>
          <AverageNumber 
            title='Average number of climbs a session'
            statistic={avgNumPerSession}
          />

          <AverageNumber 
            title='Percent of successful climbs'
            statistic={percentSent}
            isPercentage={true}
          />

          <Text style={styles.distributionHeader}>{distributionTitle}</Text>

          {
            dataByGrade.forEach((dataSet) => {
              if (!dataSet || dataSet.length === 0) {
                return null;
              }

              return (
                <Distribution 
                  data={dataSet}
                  key={distKeyId++}
                />);
            })
          }
        </ScrollView>
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

    _getBarChartData(typeOfClimb) {
      if (!this.state.climbingSessions) {
        return undefined;
      }

      let grades = this._getGrades(typeOfClimb, grades);

      let climbData = {};
      grades.forEach((grade) => {
        climbData[grade] = undefined
      });
      climbData = this._getCountOfClimbsPerGrade(typeOfClimb, climbData);
      if (!climbData) {
        return undefined;
      }

      let data = this._formatDataForGraph(climbData);
      return data;
    }

  _formatDataForGraph(climbData) {
    let data = {
      labels: [],
      datasets: [{
        data: []
      }]
    };

    Object.keys(climbData).forEach((grade) => {
      if (climbData[grade]) {
        data.labels.push(grade);
        data.datasets[0].data.push(climbData[grade]);
      }
    });

    return data;
  }

  _getCountOfClimbsPerGrade(typeOfClimb, climbData) {
    const climbingSessions = this.state.climbingSessions;
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
            climbData[difficulty] = 1;
          }
        });
    }

    return climbData;
  }

  _getGrades(typeOfClimb, grades) {
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