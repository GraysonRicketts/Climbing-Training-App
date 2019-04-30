/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Picker } from 'react-native';

export default class ClimbPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Picker
                style={{ flexGrow: 1}}
                selectedValue={this.props.climbSelected}
                onValueChange={this.props.valueChanged}
            >
                {Object.keys(this.props.items).map((itemKey) => {
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