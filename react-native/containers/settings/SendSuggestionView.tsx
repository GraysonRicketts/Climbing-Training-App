import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
    StyleSheet,
    View,
} from 'react-native';
import SubmissionForm from '../../components/SubmissionForm';
import { TEMPLATE_ID } from '../../util/EmailSender';
import AppColors from '../../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop: 60,
        paddingLeft: 15,
        paddingRight: 15,
    },
});

class SendSuggestion extends Component<NavigationScreenProps> {
    public static navigationOptions() {
        return {
            title: '‍‍Suggestion',
        };
    }

    public render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <SubmissionForm
                    goBack={navigation.goBack}
                    templateId={TEMPLATE_ID.suggestion}
                />
            </View>
        );
    }
}

export default SendSuggestion;
