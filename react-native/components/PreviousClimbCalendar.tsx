import React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { formatDate_YYYY_MM_DD } from '../util/DateFormatter';
import { 
    Calendar,
    DotMarking,
    DateObject
} from 'react-native-calendars';

const styles = StyleSheet.create({
    calendar: {
        width: '100%'
    }
});

interface IPreviousClimbCalendarProps {
    sessionDates: string[] 
    selectedDate: string
    onDayPress: Function 
}

class PreviousClimbCalendar extends Component<IPreviousClimbCalendarProps> {
    constructor(props: IPreviousClimbCalendarProps) {
        super(props);

        const todaysDate = Date.parse(Date());

        this.state = {
            selected: formatDate_YYYY_MM_DD(todaysDate)
        }
    }
    render() {
        const { 
            sessionDates,
            selectedDate,
            onDayPress 
        } = this.props;
        
        let markedDates: { [date: string] : DotMarking } = {};
        sessionDates.forEach((date: string) => {
            markedDates[date] = {
                marked: true,
                dotColor: 'teal',
                selected: selectedDate === date ? true : false
            }
        });
        
        if (!markedDates[selectedDate]) {
            markedDates[selectedDate] = {selected: true};
        }
        
        return (
            <Calendar 
                current={Date()}
                style={styles.calendar}
                markedDates={markedDates}
                markingType={'simple'}
                onDayPress={(date: DateObject) => onDayPress(date)}
                monthFormat={'MMMM yyyy'}
                hideArrows={false}
                hideExtraDays={false}
                disableMonthChange={false}
                firstDay={1} // If firstDay=1 week starts from Monday
                hideDayNames={false}
                showWeekNumbers={false}
            />
        )
    }
}

export default PreviousClimbCalendar;