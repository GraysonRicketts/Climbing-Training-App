import React, { Component } from 'react';

import {
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import BarChart from '../components/statistics/BarChart';
import Statistic from '../components/statistics/Statistic';
import CLIMB_TYPES from '../enums/ClimbingTypes';
import {
    ClimbingSession,
    Climb,
    ClimbCountsForDifficulty,
    ClimbModifier,
} from '../util/Climbs';
import { getClimbingSessionsFromPhone } from '../util/PersistentStore';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    statistic: {
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 30,
        paddingTop: 10,
        color: AppColors.black,
    },
});

function climbWasCompleted(climb: Climb): boolean {
    return climb.modifier === ClimbModifier.redPoint
        || climb.modifier === ClimbModifier.onSite
        || climb.modifier === ClimbModifier.flash;
}

function getClimbingTypeName(climbingType: CLIMB_TYPES): string {
    switch (climbingType) {
        case CLIMB_TYPES.HUECO:
            return 'Hueco';
        case CLIMB_TYPES.YOSEMITE:
            return 'Yosemite';
        case CLIMB_TYPES.FRENCH:
            return 'French';
        default:
            return '';
    }
}

function formatStatistic(statistic: number | null): string {
    if (!statistic) {
        return 'No data';
    }

    const formattedStatistic = `% ${statistic.toFixed(2)}`;
    return formattedStatistic;
}

interface HistogramTypeData {
    type: CLIMB_TYPES;
    data: ClimbCountsForDifficulty | null;
}

interface StatsViewState {
    climbingSessions: ClimbingSession[];
}

class StatsView extends Component<null, StatsViewState> {
    private totalNumberOfClimbs: number;

    public constructor(props: never) {
        super(props);

        this.totalNumberOfClimbs = 0;

        this.state = {
            climbingSessions: [],
        };
    }

    public componentWillMount() {
        getClimbingSessionsFromPhone()
            .then((climbingSessions) => {
                this.setState({
                    climbingSessions,
                });
            });
    }

    private getAvgNumPerSession(): string {
        const avgNumberOfClimbsPerSession = this.calculateAvgNumPerSession();

        const formattedAverage = formatStatistic(avgNumberOfClimbsPerSession);
        return formattedAverage;
    }

    private getPercentSent(): string {
        const percentSent = this.calculatePercentSent();

        const formattedPercentSent = formatStatistic(percentSent);
        return formattedPercentSent;
    }

    private getTotalNumberOfClimbs(): number {
        if (!this.totalNumberOfClimbs) {
            const { climbingSessions } = this.state;
            climbingSessions.forEach((session) => {
                this.totalNumberOfClimbs += session.climbs.length;
            });
        }

        return this.totalNumberOfClimbs;
    }

    private getTypeHistogramData(): HistogramTypeData[] {
        const countsByTypeOfClimb: HistogramTypeData[] = [];

        Object.values(CLIMB_TYPES)
            .filter(value => typeof value === 'number')
            .forEach((type: number) => {
                const countsForType = this.getCountOfClimbsForType(type);
                countsByTypeOfClimb.push({ type, data: countsForType });
            });

        return countsByTypeOfClimb;
    }

    private getCountOfClimbsForType(typeOfClimb: CLIMB_TYPES): ClimbCountsForDifficulty | null {
        const counts: ClimbCountsForDifficulty = {};

        const climbsForType = this.filterClimbsForType(typeOfClimb);
        if (climbsForType.length === 0) {
            return null;
        }

        climbsForType.forEach((climb) => {
            const { difficulty } = climb.route;
            if (counts[difficulty]) {
                counts[difficulty] += 1;
            } else {
                counts[difficulty] = 1;
            }
        });

        return counts;
    }

    private calculatePercentSent(): number {
        const { climbingSessions } = this.state;
        if (!climbingSessions) {
            return NaN;
        }


        let numCompletedClimbs = 0;
        climbingSessions.forEach((session) => {
            session.climbs.forEach((climb) => {
                if (climbWasCompleted(climb)) {
                    numCompletedClimbs += 1;
                }
            });
        });

        const totalNumOfClimbs = this.getTotalNumberOfClimbs();
        const percentSent = (numCompletedClimbs / totalNumOfClimbs) * 100;
        return percentSent;
    }

    private calculateAvgNumPerSession(): number {
        const { climbingSessions } = this.state;
        if (!climbingSessions) {
            return NaN;
        }

        const numberOfSessions = climbingSessions.length;
        const totalNumOfClimbs = this.getTotalNumberOfClimbs();

        const avgNumPerSession = totalNumOfClimbs / numberOfSessions;

        return avgNumPerSession;
    }

    private filterClimbsForType(type: CLIMB_TYPES): Climb[] {
        const { climbingSessions } = this.state;

        const climbsForType: Climb[] = [];
        climbingSessions.forEach(session => session.climbs
            .filter(climb => climb.route.type === type)
            .forEach(climb => climbsForType.push(climb)));

        return climbsForType;
    }

    // TODO: # of onsites
    // TODO: ranking how it felt / comments
    // TODO: types (e.g. slab, crimp, overhang)
    // TODO: personal tags
    public render() {
        const avgNumPerSession = this.getAvgNumPerSession();
        const percentSent = this.getPercentSent();
        const typeHistogramData = this.getTypeHistogramData();
        let distKeyId = 0;

        return (
            <ScrollView style={styles.container}>
                <Statistic title='Average number of climbs a session'>
                    <Text style={styles.statistic}>
                        {avgNumPerSession}
                    </Text>
                </Statistic>

                <Statistic title='Percent of successful climbs'>
                    <Text style={styles.statistic}>
                        {percentSent}
                    </Text>
                </Statistic>

                {typeHistogramData
                    .map((climbs) => {
                        if (!climbs.data) {
                            return null;
                        }

                        distKeyId += 1;
                        return (
                            <Statistic
                                key={distKeyId}
                                title={getClimbingTypeName(climbs.type)}
                            >
                                <BarChart data={climbs.data} />
                            </Statistic>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default StatsView;
