import React, {Component} from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

const ROW_FONT_SIZE = 30;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 25,
        paddingBottom: 25,
        borderColor: '#AAA',
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

class ClimbDataRow extends Component {
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