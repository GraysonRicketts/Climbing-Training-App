import React from 'react';
import { Component } from 'react';
import { Picker } from 'react-native';

interface IClimbPickerProps {
    climbSelected: any // TODO: typecheck
    onValuedChanged: Function
    items: any // TODO: typecheck
}

export default class ClimbPicker extends Component<IClimbPickerProps> {
    render() {
        const {
            climbSelected,
            onValuedChanged,
            items
        } = this.props;

        return (
            <Picker
                style={{ flexGrow: 1}}
                selectedValue={climbSelected}
                onValueChange={() => onValuedChanged()}
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