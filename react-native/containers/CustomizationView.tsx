import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
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
    linkButton: {
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.black,
        padding: 20,
        marginBottom: -1,
        alignItems: 'flex-start',
    },
});

class CustomizationView extends Component<NavigationScreenProps> {
    public static navigationOptions() {
        return {
            title: 'Customize',
        };
    }

    public constructor(props: NavigationScreenProps) {
        super(props);

        this.pushReportBugView = this.pushReportBugView.bind(this);
        this.pushSettingsView = this.pushSettingsView.bind(this);
        this.pushSuggestionView = this.pushSuggestionView.bind(this);
        this.pushAboutView = this.pushAboutView.bind(this);
    }

    private pushReportBugView() {
        const { navigation } = this.props;
        navigation.push('ReportBug');
    }

    private pushSettingsView() {
        const { navigation } = this.props;
        navigation.push('Settings');
    }

    private pushSuggestionView() {
        const { navigation } = this.props;
        navigation.push('SendSuggestion');
    }

    private pushAboutView() {
        const { navigation } = this.props;
        navigation.push('About');
    }

    // TODO: profile (screen)
    // TODO: linked account / login info
    // TODO: payment info
    public render() {
        return (
            <View style={styles.container}>
                <Button
                    fontColor={AppColors.navigationBlue}
                    fontSize={18}
                    onPress={this.pushSettingsView}
                    style={styles.linkButton}
                    title='Settings'
                />

                <Button
                    fontColor={AppColors.navigationBlue}
                    fontSize={18}
                    onPress={this.pushSuggestionView}
                    style={styles.linkButton}
                    title='Send a suggestion'
                />

                <Button
                    fontColor={AppColors.errorRed}
                    fontSize={20}
                    onPress={this.pushReportBugView}
                    style={styles.linkButton}
                    title='Report a bug'
                />

                <Button
                    fontColor={AppColors.navigationBlue}
                    fontSize={18}
                    onPress={this.pushAboutView}
                    style={styles.linkButton}
                    title='About'
                />

                <Text style={styles.explanatoryText}>
                *Customizable profiles to come in future release
                </Text>
            </View>
        );
    }
}

export default CustomizationView;
