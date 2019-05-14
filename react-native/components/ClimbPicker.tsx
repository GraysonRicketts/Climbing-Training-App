import React from 'react';
import { Component } from 'react';
import { Picker } from 'react-native';
import CLIMBING_TYPE from '../enums/ClimbingTypes';
import { Route } from '../util/Climbs';
import { IClimbDifficultyRatings } from './../enums/Ratings';

interface IClimbPickerProps {
    routeSelected: Route
    onValuedChange: Function
    items: IClimbDifficultyRatings
    type: CLIMBING_TYPE
}

export default class ClimbPicker extends Component<IClimbPickerProps> {
    render() {
        const {
            routeSelected,
            onValuedChange,
            items,
            type
        } = this.props;

        return (
            <Picker
                style={{ flexGrow: 1}}
                selectedValue={routeSelected.difficulty}
                onValueChange={(difficulty: string) => onValuedChange(difficulty, type)}
            >
                {Object.keys(items).map((itemKey) => {
                    return (
                        <Picker.Item 
                            key={itemKey} 
                            label={itemKey}
                            value={itemKey}
                        />
                    );
                })}
            </Picker>
        );
    }
}