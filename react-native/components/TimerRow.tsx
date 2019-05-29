import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        alignContent: 'center',
    },
    sinceLastText: {
        color: AppColors.black,
    },
    totalText: {
        color: AppColors.gray,
    },
});

function prettifyMinutesTime(timeInMilliseconds: number): string {
    const minutes = timeInMilliseconds / 60000;
    const formattedMinutes = Math.floor(minutes).toString().padStart(2, '0');

    return formattedMinutes;
}

function prettifySinceLastClimb(timeInMilliseconds: number): string {
    const seconds = (timeInMilliseconds % 60000) / 1000;
    const formattedSeconds = Math.floor(seconds).toString().padStart(2, '0');

    const formattedMinutes = prettifyMinutesTime(timeInMilliseconds);

    return `${formattedMinutes} : ${formattedSeconds}`;
}

interface TimerRowProps {
    totalSeconds: number;
    secondsSinceLastClimb: number;
}

const TimerRow = (props: TimerRowProps) => {
    const {
        totalSeconds,
        secondsSinceLastClimb,
    } = props;

    const formattedTotalTime = prettifyMinutesTime(totalSeconds);
    const formattedSecondsSinceLastClimb = prettifySinceLastClimb(secondsSinceLastClimb);

    return (
        <View style={styles.container}>
            <Text style={styles.sinceLastText}>
                {`Last climb  ⏱  ${formattedSecondsSinceLastClimb}`}
            </Text>

            <Text style={styles.totalText}>
                {`  (${formattedTotalTime} min)`}
            </Text>
        </View>
    );
};

export default TimerRow;
