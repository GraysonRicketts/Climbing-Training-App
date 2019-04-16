import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: '30%',

    },
    instructionText: {
        textAlign: 'center',
        color: '#222',
        fontSize: 25,
        width: '66%'
    },
    downArrow: {
        paddingTop: '10%',
        fontSize: 45
    }
});

class NoClimbsComponent extends Component {
    render() {
        const instructions = 'Add a climb by clicking the button below';
    
        return (
            <View style={styles.container}>
                <Text style={styles.instructionText}>{instructions}</Text>
                <Text style={styles.downArrow}>⬇️</Text>
            </View>
        );
    }
}

export default NoClimbsComponent;