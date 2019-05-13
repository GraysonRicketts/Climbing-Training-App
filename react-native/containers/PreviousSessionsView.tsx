import React from 'react';
import { Component } from 'react';
import {
  SectionList, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ClimbDataRow from '../components/ClimbDataRow';
import ClimbingSessionHeader from '../components/ClimbingSessionHeader'
import PreviousClimbCalendar from '../components/PreviousClimbCalendar';
import { formatDate_YYYY_MM_DD } from '../util/DateFormatter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sessionList: {
    width: '100%',
    marginBottom: 25
  },
  noClimbText: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 15,
    flexGrow: 2
  }
});

interface IPreviousSessionsState {
  state: any[]
  selectedDate: string
}

class PreviousSessions extends Component<null, IPreviousSessionsState> {
    constructor(props: any) {
        super(props);

        this.state = {
          climbingSessions: [],
          selectedDate: formatDate_YYYY_MM_DD(Date.parse(Date()))
        }
    }

    componentWillMount() {
      this._getClimbingSessions();
    }

    render() {
      const { climbingSessions } = this.state;

      const sessionsFormatedForSection = climbingSessions
        .filter(this._climbIsSelected.bind(this))  
        .map((climb) => ({
          title: climb[0], 
          data: climb[1]
        }));

      const sessionDates = this._getSessionDates();

      return (
        <View style={styles.container}>
          <PreviousClimbCalendar 
            sessionDates={sessionDates}
            selectedDate={this.state.selectedDate}
            onDayPress={this.onDayPress.bind(this)}
          />

          { sessionsFormatedForSection.length ? 
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
              stickySectionHeadersEnabled={true}
            />
            : 
            <Text style={styles.noClimbText}>
              No climbs logged
            </Text>
          }
          
        </View>
      );
    }

    _climbIsSelected(climb) {
      const climbDate = parseInt(climb[0].split('^')[0]);
      const formattedClimbDate = formatDate_YYYY_MM_DD(climbDate);

      return (formattedClimbDate === this.state.selectedDate);
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

    onDayPress(day) {
      this.setState({
        selectedDate: day.dateString
      })
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

    _compareClimbDates(climbDateA: string, climbDateB: string): number {
      const parsedClimbDateA = parseInt(climbDateA[0].split('^')[0]);
      const parsedClimbDateB = parseInt(climbDateB[0].split('^')[0]);
      return parsedClimbDateB - parsedClimbDateA;
    }
}

  export default PreviousSessions;