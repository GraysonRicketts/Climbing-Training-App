import React from 'react';

import {
    Picker,
    StyleSheet,
} from 'react-native';
import CLIMBING_TYPE from '../enums/ClimbingTypes';
import { Route } from '../util/Climbs';
import ClimbDifficultyRatings from '../enums/Ratings';

const styles = StyleSheet.create({
    picker: {
        flexGrow: 1,
    },
});

interface ClimbPickerProps {
    routeSelected: Route;
    onValuedChange: Function;
    items: ClimbDifficultyRatings;
    type: CLIMBING_TYPE;
}

const ClimbPicker = (props: ClimbPickerProps) => {
    const {
        routeSelected,
        onValuedChange,
        items,
        type,
    } = props;

    return (
        <Picker
            onValueChange={(difficulty: string) => onValuedChange(difficulty, type)}
            selectedValue={routeSelected.difficulty}
            style={styles.picker}
        >
            {Object.keys(items).map(itemKey => (
                <Picker.Item
                    key={itemKey}
                    label={itemKey}
                    value={itemKey}
                />
            ))}
        </Picker>
    );
};

export default ClimbPicker;
