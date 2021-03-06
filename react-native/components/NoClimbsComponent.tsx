import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: '30%',

    },
    instructionText: {
        textAlign: 'center',
        color: AppColors.black,
        fontSize: 25,
        width: '66%',
    },
    downArrow: {
        paddingTop: '10%',
        fontSize: 45,
    },
});

const NoClimbsComponent = () => {
    const instructions = 'Add a climb by clicking the button below';

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>{instructions}</Text>
            <Text style={styles.downArrow}>⬇️</Text>
        </View>
    );
};

export default NoClimbsComponent;
