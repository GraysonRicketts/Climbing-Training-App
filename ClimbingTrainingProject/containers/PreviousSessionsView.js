/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ClimbDataRow from '../components/ClimbDataRow';
import ClimbingSessionHeader from '../components/ClimbingSessionHeader'
import PreviousClimbCalendar from '../components/PreviousClimbCalendar';
import { formatDate_YYYY_MM_DD } from './../helpers/DateFormatter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sessionList: {
    width: '100%',
  },
  sessionSeparator: {
    backgroundColor: '#FDFDFD',
    height: 25,
    borderColor: '#AAA',
    borderBottomWidth: 1,
    borderRadius: 0
  }
});

class StatsView extends Component {
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
      const sessionsFormatedForSection = this.state.climbingSessions.map((climb) => ({
        title: climb[0], 
        data: climb[1]
      }))

      const sessionDates = this._getSessionDates();

      return (
        <View style={styles.container}>
          <PreviousClimbCalendar 
            sessionDates={sessionDates}
          />
          <SectionList
            renderItem={({item: climb, index}) => (
              <ClimbDataRow 
                difficulty={climb.route.difficulty}
                sentIt={climb.sentIt}
                key={index}
              />)}
            renderSectionHeader={({section: {title}}) => (
              <ClimbingSessionHeader
                title={title}
              />
            )}
            sections={sessionsFormatedForSection}
            style={styles.sessionList}
            renderSectionFooter={() => <View style={styles.sessionSeparator}/>}
            stickySectionHeadersEnabled={true}
          />
        </View>
      );
    }
    
    _getSessionDates() {
      if (!this.state.climbingSessions) {
        return null;
      }

      let dates = [];
      this.state.climbingSessions.forEach((session) => {
        const sessionTitle = session[0];
        
        let dateInMS = sessionTitle.split('^')[0];
        const date = formatDate_YYYY_MM_DD(dateInMS);
        if (!date) {
          return;
        }
        
        dates.push(date)
      });

      return dates;
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

        // Sort so newest climbs first
        climbingSessions = climbingSessions.sort(this._compareClimbDates);

        this.setState({
          climbingSessions
        })
      }
      catch(error) {
        console.error(error);
      }
    }

    _compareClimbDates(climb1, climb2) {
      const climb1Date = parseInt(climb1[0].split('^')[0]);
      const climb2Date = parseInt(climb2[0].split('^')[0]);
      return climb2Date - climb1Date;
    }
}

  export default StatsView;