import React from 'react';
import { Component } from 'react';
import {
  SectionList, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import ClimbDataRow from '../components/ClimbDataRow';
import ClimbingSessionHeader from '../components/ClimbingSessionHeader'
import PreviousClimbCalendar from '../components/PreviousClimbCalendar';
import { formatDate_YYYY_MM_DD } from '../util/DateFormatter';
import { DateObject } from 'react-native-calendars';
import { getClimbingSessionsFromPhone } from './../util/PersistentStore';
import { ClimbingSession } from '../util/Climbs';
import { formatDate_MMMM_DD_YYYY } from '../util/DateFormatter';

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
  climbingSessions: ClimbingSession[]
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
      getClimbingSessionsFromPhone()
        .then((climbingSessions) => {
          // Sort in chronologically descending order
          const sortedSessions = climbingSessions.sort(
            (sessionA, sessionB) => sessionB.startTime - sessionA.startTime
          );


          this.setState({
            climbingSessions: sortedSessions ? sortedSessions : []
          });
        }
      );
    }

    render() {
      const { climbingSessions } = this.state;

      const sessionsFormatedForSectionList = climbingSessions
        .filter(this._dateIsSelected.bind(this))  
        .map((session) => {
          let title = this._formatSectionTitle(session.startTime, session.title);
          
          return ({
            title: title, 
            data: session.climbs
          });
        });

      const sessionDates = this._getSessionDates();

      return (
        <View style={styles.container}>
          <PreviousClimbCalendar 
            sessionDates={sessionDates}
            selectedDate={this.state.selectedDate}
            onDayPress={this.onDayPress.bind(this)}
          />

          { sessionsFormatedForSectionList.length ? 
            <SectionList
              renderItem={({ item: climb }) => (
                <ClimbDataRow 
                  difficulty={climb.route.difficulty}
                  sentIt={climb.completed}
                  key={climb.key}
                />)}
              renderSectionHeader={({section: { title } }) => (
                <ClimbingSessionHeader
                  title={title}
                />
              )}
              sections={sessionsFormatedForSectionList}
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

    _formatSectionTitle(date: number, title?: string): string {
      // Turn ms from epoch into human readable format
      const formattedDate = formatDate_MMMM_DD_YYYY(date);
  
      let formattedTitle = formattedDate;
      if (title) {
          formattedTitle = `${formattedDate} : ${title}`;
      }
  
      return formattedTitle;
  }

    _dateIsSelected(session: ClimbingSession) {
      const formattedClimbDate = formatDate_YYYY_MM_DD(session.startTime);

      return (formattedClimbDate === this.state.selectedDate);
    }
    
    _getSessionDates(): string[] {
      const { climbingSessions } = this.state;
      let dates: string[] = [];

      climbingSessions.forEach((session) => {
        const date = formatDate_YYYY_MM_DD(session.startTime);
        if (!date) {
          return;
        }
        
        dates.push(date)
      });

      return dates;
    }

    onDayPress(day: DateObject) {
      this.setState({
        selectedDate: day.dateString
      })
    }
}

  export default PreviousSessions;