import React, { Component } from 'react';

import {
    SectionList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { DateObject } from 'react-native-calendars';
import ClimbDataRow from '../components/ClimbDataRow';
import ClimbingSessionHeader from '../components/ClimbingSessionHeader';
import PreviousClimbCalendar from '../components/PreviousClimbCalendar';
import {
    formatDateYYYYMMDD,
    formatDateMMMMDDYYYY,
} from '../util/DateFormatter';
import { getClimbingSessionsFromPhone } from '../util/PersistentStore';
import { ClimbingSession } from '../util/Climbs';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.white,
    },
    sessionList: {
        width: '100%',
        marginBottom: 25,
    },
    noClimbText: {
        textAlign: 'center',
        fontSize: 22,
        marginTop: 15,
        flexGrow: 2,
    },
});

function formatSectionTitle(date: number, title?: string): string {
    // Turn ms from epoch into human readable format
    const formattedDate = formatDateMMMMDDYYYY(date);

    let formattedTitle = formattedDate;
    if (title) {
        formattedTitle = `${formattedDate} : ${title}`;
    }

    return formattedTitle;
}

interface PreviousSessionsState {
    climbingSessions: ClimbingSession[];
    selectedDate: string;
}

class PreviousSessions extends Component<null, PreviousSessionsState> {
    public constructor(props: never) {
        super(props);

        this.onDayPress = this.onDayPress.bind(this);

        this.state = {
            climbingSessions: [],
            selectedDate: formatDateYYYYMMDD(Date.parse(Date())),
        };
    }

    public componentWillMount() {
        getClimbingSessionsFromPhone()
            .then((climbingSessions) => {
                // Sort in chronologically descending order
                const sortedSessions = climbingSessions.sort(
                    (sessionA, sessionB) => sessionB.startTime - sessionA.startTime,
                );


                this.setState({
                    climbingSessions: sortedSessions || [],
                });
            });
    }

    private onDayPress(day: DateObject) {
        this.setState({
            selectedDate: day.dateString,
        });
    }

    private getSessionDates(): string[] {
        const { climbingSessions } = this.state;
        const dates: string[] = [];

        climbingSessions.forEach((session) => {
            const date = formatDateYYYYMMDD(session.startTime);
            if (!date) {
                return;
            }

            dates.push(date);
        });

        return dates;
    }

    private dateIsSelected(session: ClimbingSession) {
        const { selectedDate } = this.state;
        const formattedClimbDate = formatDateYYYYMMDD(session.startTime);

        return (formattedClimbDate === selectedDate);
    }

    public render() {
        const {
            climbingSessions,
            selectedDate,
        } = this.state;

        const sessionsFormatedForSectionList = climbingSessions
            .filter(this.dateIsSelected.bind(this))
            .map((session) => {
                const title = formatSectionTitle(session.startTime, session.title);

                return ({
                    title,
                    data: session.climbs,
                });
            });

        const sessionDates = this.getSessionDates();

        return (
            <View style={styles.container}>
                <PreviousClimbCalendar
                    onDayPress={this.onDayPress}
                    selectedDate={selectedDate}
                    sessionDates={sessionDates}
                />

                { sessionsFormatedForSectionList.length ? (
                    <SectionList
                        renderItem={({ item: climb }) => (
                            <ClimbDataRow
                                difficulty={climb.route.difficulty}
                                key={climb.key}
                                sentIt={climb.completed}
                            />
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <ClimbingSessionHeader
                                title={title}
                            />
                        )}
                        sections={sessionsFormatedForSectionList}
                        stickySectionHeadersEnabled
                        style={styles.sessionList}
                    />
                ) : (
                    <Text style={styles.noClimbText}>
                        {'No climbs logged'}
                    </Text>
                )}

            </View>
        );
    }
}

export default PreviousSessions;
