import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { formatDate_YYYY_MM_DD } from './../helpers/DateFormatter';

const styles = StyleSheet.create({
});

class PreviousClimbCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: formatDate_YYYY_MM_DD(Date.parse(Date()))
        }
    }
    render() {
        const { sessionDates, selectedDate, onDayPress } = this.props;
        
        let markedDates = {};
        sessionDates.forEach((date) => {
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
                markedDates={markedDates}
                markingType={'simple'}
                minDate={undefined} // dates before minDate will be grayed out
                maxDate={undefined} // dates after maxDate will be grayed out
                onDayPress={onDayPress}
                onDayLongPress={undefined}
                monthFormat={'MMMM yyyy'}
                onMonthChange={undefined}
                hideArrows={false}
                renderArrow={undefined}
                hideExtraDays={false}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page
                disableMonthChange={false}
                firstDay={1} // If firstDay=1 week starts from Monday
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={undefined}
                onPressArrowRight={undefined}
            />
        )
    }
}

export default PreviousClimbCalendar;