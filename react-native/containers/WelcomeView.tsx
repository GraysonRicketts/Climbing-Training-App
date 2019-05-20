import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {
    NavigationScreenProps,
    NavigationStackScreenOptions,
} from 'react-navigation';
import Button from '../components/Button';
import AppColors from '../enums/Colors';
import Images from '../assets/Images';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AppColors.white,
    },
    explanatoryText: {
        fontSize: 14,
        textAlign: 'center',
        color: AppColors.black,
        position: 'absolute',
        bottom: 20,
    },
    navigationButton: {
        backgroundColor: AppColors.lightBlue,
        margin: 25,
        borderRadius: 45,
        width: '80%',
    },
    logSessionButton: {
        backgroundColor: AppColors.green,
    },
    buttonIcon: {
        width: 50,
        height: 50,
    },
});

class WelcomeView extends Component<NavigationScreenProps> {
    public static navigationOptions(navigationState: NavigationScreenProps): NavigationStackScreenOptions {
        const { navigation } = navigationState;

        return {
            title: '‍‍🧗‍♀️ Welcome',
            headerRight: <Button
                fontSize={20}
                onPress={() => navigation.navigate('Customize')}
                title='⚙️'
            />,
        };
    }

    public constructor(props: NavigationScreenProps) {
        super(props);

        this.pushTrainingSessionView = this.pushTrainingSessionView.bind(this);
        this.pushStatisticsView = this.pushStatisticsView.bind(this);
        this.pushPreviousSessionsView = this.pushPreviousSessionsView.bind(this);
    }

    private pushTrainingSessionView(): void {
        const { navigation } = this.props;
        navigation.push('TrainingSession');
    }

    private pushPreviousSessionsView(): void {
        const { navigation } = this.props;
        navigation.push('PreviousSessions');
    }

    private pushStatisticsView(): void {
        const { navigation } = this.props;
        navigation.push('Stats');
    }

    public render() {
        const navigationFontSize = 20;
        const navigationFontColor = AppColors.black;

        return (
            <View style={styles.container}>
                <Button
                    fontColor={navigationFontColor}
                    fontSize={navigationFontSize}
                    onPress={this.pushTrainingSessionView}
                    style={{ ...styles.navigationButton, ...styles.logSessionButton }}
                    title='Log session'
                >
                    <Image
                        source={Images.save}
                        style={{ ...styles.buttonIcon, tintColor: navigationFontColor }}
                    />
                </Button>

                <Button
                    fontColor={navigationFontColor}
                    fontSize={navigationFontSize}
                    onPress={this.pushPreviousSessionsView}
                    style={styles.navigationButton}
                    title='Previous sessions'
                >
                    <Image
                        source={Images.calendar}
                        style={styles.buttonIcon}
                    />
                </Button>

                <Button
                    fontColor={navigationFontColor}
                    fontSize={navigationFontSize}
                    onPress={this.pushStatisticsView}
                    style={styles.navigationButton}
                    title='Statistics'
                >
                    <Image
                        source={Images.chart}
                        style={styles.buttonIcon}
                    />
                </Button>

                <Text style={styles.explanatoryText}>
                    * This app is currently under development. Expect frequent changes and possible loss of data.
                </Text>
            </View>
        );
    }
}

export default WelcomeView;
