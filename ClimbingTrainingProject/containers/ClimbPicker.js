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
        
        this.state = {
            selectedValue: props.selectedValue,
            items: props.items
        };
    }
    
    updateList(value) {
        this.setState({ selectedValue: value });
    }

    render() {
        return (
            <Picker
                style={{ flexGrow: 1}}
                selectedValue={this.state.selectedValue}
                onValueChange={this.updateList.bind(this)}
            >
                {this.state.items.map((item) => {
                    return (
                        <Picker.Item 
                            label={item.label}
                            value={item.value}
                            key={item.label} 
                        />
                    );
                })}
            </Picker>
        );
      }
}