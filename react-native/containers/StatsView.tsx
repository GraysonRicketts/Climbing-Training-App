import React from 'react';
import { Component } from 'react';
import { 
  StyleSheet, 
  ScrollView,
  Text,
} from 'react-native';
import BarChart from '../components/statistics/BarChart';
import Statistic from '../components/statistics/Statistic';
import CLIMB_TYPES from '../enums/ClimbingTypes';
import FRENCH_RATINGS from '../enums/FrenchRatings';
import YOSEMITE_RATINGS from '../enums/YosemiteRatings';
import HUECO_RATINGS from '../enums/HuecoRatings';
import {
  ClimbingSession,
  Climb
} from './../util/Climbs';
import { getClimbingSessionsFromPhone } from './../util/PersistentStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF', // TODO: use project defined color
  },
  statistic: {
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 10,
    color: '#111' // TODO: use project defined color
  },
});

type CountForDifficulty = { [difficulty : string] : number };
type HistogramTypeData = { type: CLIMB_TYPES, data: CountForDifficulty };

interface IStatsViewState {
  climbingSessions: ClimbingSession[]
}

class StatsView extends Component<null, IStatsViewState> {
  _totalNumberOfClimbs: number;

  constructor(props: any) {
    super(props);

    this._totalNumberOfClimbs = 0;

    this.state = {
      climbingSessions: []
    }
  }

  componentWillMount() {
    getClimbingSessionsFromPhone()
      .then((climbingSessions) => {
        this.setState({
          climbingSessions
        });
      }
    );
  }

  // TODO: # of onsites
  // TODO: ranking how it felt / comments
  // TODO: types (e.g. slab, crimp, overhang)
  // TODO: personal tags
  render() {
    const avgNumPerSession = this._getAvgNumPerSession();
    const percentSent = this._getPercentSent();
    const typeHistogramData = this._getTypeHistogramData(); 
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
          typeHistogramData ?
          typeHistogramData.map(climbs => 
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

  _formatStatistic(statistic: number): string {
    const formattedStatistic = `% ${statistic.toFixed(2)}`;
    return formattedStatistic;
  }

  _getAvgNumPerSession(): string | null {
    const avgNumberOfClimbsPerSession = this._calculateAvgNumPerSession();
    if (!avgNumberOfClimbsPerSession) {
      return null;
    }

    const formattedAverage = this._formatStatistic(avgNumberOfClimbsPerSession);
    return formattedAverage;
  }

  _getPercentSent(): string | null {
    const percentSent = this._calculatePercentSent();
    if (!percentSent) {
      return null;
    }

    const formattedPercentSent = this._formatStatistic(percentSent);
    return formattedPercentSent;
  }

  _getClimbingTypeName(climbingType: CLIMB_TYPES): string {
    switch(climbingType) {
        case CLIMB_TYPES.HUECO:
          return 'Hueco';
        case CLIMB_TYPES.YOSEMITE:
          return 'Yosemite';
        case CLIMB_TYPES.FRENCH:
          return 'French';
    };
  }

  _getTotalNumberOfClimbs(): number {
    if (!this._totalNumberOfClimbs) {
      const { climbingSessions } = this.state;
      climbingSessions.forEach((session) => this._totalNumberOfClimbs += session.climbs.length);

    }

    return this._totalNumberOfClimbs;
  }

  _calculateAvgNumPerSession(): number {
    const { climbingSessions } = this.state;
    if (!climbingSessions) {
      return NaN;
    }

    let numberOfSessions = climbingSessions.length;
    let totalNumOfClimbs = this._getTotalNumberOfClimbs();

    const avgNumPerSession = totalNumOfClimbs / numberOfSessions;

    return avgNumPerSession;
  }
  
  _calculatePercentSent(): number {
    const { climbingSessions } = this.state;
    if (!climbingSessions) {
      return NaN
    }

    
    let numCompletedClimbs = 0;
    climbingSessions.forEach((session) => {
      session.climbs.forEach((climb) => {
        if (climb.completed) {
          numCompletedClimbs++;
        }
      });
    });
    
    let totalNumOfClimbs = this._getTotalNumberOfClimbs();
    const percentSent = (numCompletedClimbs / totalNumOfClimbs) * 100;
    return percentSent;
  }

  _getTypeHistogramData(): HistogramTypeData[]  {
    let countsByTypeOfClimb: HistogramTypeData[] = [];
    
    Object.values(CLIMB_TYPES).forEach((type) => {
      const countsForType = this._getCountOfClimbsForType(type);
      countsByTypeOfClimb.push({type, data: countsForType});
    });

    return countsByTypeOfClimb;
  }

  _getCountOfClimbsForType(typeOfClimb: CLIMB_TYPES): CountForDifficulty  {
    let counts: CountForDifficulty = {};
    const climbsForType = this._filterClimbsForType(typeOfClimb);

    climbsForType.forEach((climb) => {
      const difficulty = climb.route.difficulty;
      if (counts[difficulty]) {
        counts[difficulty] += 1;
      }
      else {
        counts[difficulty] = 1;
      }
    });

    return counts;
  }

  _filterClimbsForType(type: CLIMB_TYPES): Climb[] {
    const { climbingSessions }  = this.state;

    let climbsForType: Climb[] = [];
    climbingSessions.forEach(session => session.climbs
      .filter(climb => climb.route.type === type)
      .forEach(climb => climbsForType.push(climb))
    ); 
    
    return climbsForType;
  }

  _getGradesForType(typeOfClimb: CLIMB_TYPES): string[] {
    let grades: string[] = [];

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