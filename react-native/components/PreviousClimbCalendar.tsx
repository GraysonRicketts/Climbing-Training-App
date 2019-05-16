import React from 'react';

import { StyleSheet } from 'react-native';
import {
    Calendar,
    DotMarking,
    DateObject,
} from 'react-native-calendars';

const styles = StyleSheet.create({
    calendar: {
        width: '100%',
    },
});

interface PreviousClimbCalendarProps {
    sessionDates: string[];
    selectedDate: string;
    onDayPress: Function;
}

const PreviousClimbCalendar = (props: PreviousClimbCalendarProps) => {
    const {
        sessionDates,
        selectedDate,
        onDayPress,
    } = props;

    const markedDates: { [date: string]: DotMarking } = {};
    sessionDates.forEach((date: string) => {
        markedDates[date] = {
            marked: true,
            dotColor: 'teal',
            selected: selectedDate === date,
        };
    });

    if (!markedDates[selectedDate]) {
        markedDates[selectedDate] = { selected: true };
    }

    return (
        <Calendar
            current={Date()}
            disableMonthChange={false}
            firstDay={1}
            hideArrows={false}
            hideDayNames={false}
            hideExtraDays={false}
            markedDates={markedDates}
            markingType='simple'
            monthFormat='MMMM yyyy'
            onDayPress={(date: DateObject) => onDayPress(date)} // If firstDay=1 week starts from Monday
            showWeekNumbers={false}
            style={styles.calendar}
        />
    );
};

export default PreviousClimbCalendar;
