import React, {Component} from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

export default class ClimbDataRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const  { difficulty, sentIt, isSelected, onPress } = this.props;
    
        return (
            <TouchableHighlight 
                onPress={onPress}
                underlayColor={'#F5FCFF'}
                activeOpacity={0.5}
                style={isSelected ? { backgroundColor: '#73C2FB'} : undefined }
            >
                <View style={ClimbDataRow.styles.container}>
                    <Text style={ClimbDataRow.styles.difficultyText}>
                        {difficulty}
                    </Text>
                    <Text style={ClimbDataRow.styles.sentText}>
                        {sentIt ? '✔️' : '❌'}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    static get styles() {
        return StyleSheet.create({
            container: {
                flexDirection: 'row',
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 5,
                paddingBottom: 5,
                borderColor: '#AAA',
                borderRadius: 0,
                borderBottomWidth: 0.5
            },
            difficultyText: {
                fontSize: 20,
                flexGrow: 2
            },
            sentText: {
                fontSize: 20
            }
        });
    }
}