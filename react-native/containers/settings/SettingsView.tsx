import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AppColors from '../../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'center',
    },
    explanatoryText: {
        marginTop: 15,
        fontSize: 14,
        width: '100%',
        textAlign: 'center',
        color: AppColors.black,
        position: 'absolute',
        bottom: 20,
    },
});

class Settings extends Component {
    public static navigationOptions() {
        return {
            title: '‍‍Settings',
        };
    }

    // TODO: settings zone (screen)
    // TODO: default grade
    // TODO: hide grades
    // TODO: what fields show up when adding climb
    // TODO: tags
    // TODO: sent it?
    // TODO: onsite
    // TODO: num attempts
    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.explanatoryText}>
                    *Customization to come in future release
                </Text>
            </View>
        );
    }
}

export default Settings;
