import React from 'react';
import { Component } from 'react';
import { 
    TouchableHighlight,
    View,
    Text,
    StyleSheet 
} from 'react-native';

const ROW_FONT_SIZE = 30;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 25,
        paddingBottom: 25,
        borderColor: '#AAA', // TODO: use project defined color
        borderRadius: 0,
        borderBottomWidth: 0.5
    },
    difficultyText: {
        fontSize: ROW_FONT_SIZE,
        flexGrow: 2
    },
    sentText: {
        fontSize: ROW_FONT_SIZE
    }
});

interface IClimbDataRowProps {
    difficulty: string
    sentIt: boolean
    onPress?: Function
    isSelected?: boolean
    climbKey?: number
}

class ClimbDataRow extends Component<IClimbDataRowProps> {
    render() {
        const  { 
            difficulty,
            sentIt, 
            isSelected,
            onPress,
            climbKey
        } = this.props;
    
        return (
            <TouchableHighlight 
                onPress={onPress ? (_) => onPress(climbKey) : () => {} }
                underlayColor={'#F5FCFF'} // TODO: use project defined color
                activeOpacity={0.5}
                style={isSelected ? { backgroundColor: '#73C2FB'} : undefined } // TODO: use project defined color
            >
                <View 
                    style={{
                        ...styles.container,
                        opacity: sentIt ? 1 : 0.25
                    }}
                >
                    <Text style={styles.difficultyText}>
                        {difficulty}
                    </Text>
                    <Text style={styles.sentText}>
                        {sentIt ? '✔️' : '❌'}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default ClimbDataRow;