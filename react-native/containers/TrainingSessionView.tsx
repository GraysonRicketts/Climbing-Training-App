import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';
import {
    NavigationScreenProps,
    NavigationStackScreenOptions,
} from 'react-navigation';
import LogClimbModal from '../components/LogClimbModal';
import SessionHeaderButton from '../components/SessionHeaderButton';
import Button from '../components/Button';
import ClimbList from '../components/ClimbList';
import {
    Climb,
    Route,
} from '../util/Climbs';
import { saveSessionToPhone } from '../util/PersistentStore';
import AppColors from '../enums/Colors';
import TimerRow from '../components/TimerRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
    },
    addButton: {
        backgroundColor: AppColors.saveGreen,
        width: '100%',
        height: 100,
        paddingTop: 20,
        paddingBottom: '4%',
    },
});


interface TrainingSessionViewState {
    startTime: number;
    endTime?: number;
    showLogClimbModal: boolean;
    climbs: Climb[];
    climbSelected?: Climb;
    isEditingRoute: boolean;
    durationSinceStart: number;
    durationSinceLastClimb: number;
}

class TrainingSessionView extends Component<NavigationScreenProps, TrainingSessionViewState> {
    public static navigationOptions(navigationState: NavigationScreenProps): NavigationStackScreenOptions {
        const { navigation } = navigationState;

        return {
            headerLeft: <SessionHeaderButton
                isCancel
                navigation={navigation}
                navigationParam='cancelSession'
                title='Discard'
            />,
            headerRight: <SessionHeaderButton
                navigation={navigation}
                navigationParam='saveSession'
                title='Save session'
            />,
        };
    }

    private key: number;

    private timer: number;

    public constructor(props: NavigationScreenProps) {
        super(props);

        this.key = 0;

        this.onPreviousClimbPressed = this.onPreviousClimbPressed.bind(this);
        this.showClimbModal = this.showClimbModal.bind(this);
        this.hideClimbModal = this.hideClimbModal.bind(this);
        this.saveClimb = this.saveClimb.bind(this);

        this.timer = setInterval(() => {
            this.setState(prevState => ({
                ...prevState,
                durationSinceStart: prevState.durationSinceStart + 1,
                durationSinceLastClimb: prevState.durationSinceLastClimb + 1,
            }));
        }, 1000);

        this.state = {
            startTime: Date.now(),
            endTime: undefined,
            showLogClimbModal: false,
            climbs: [],
            climbSelected: undefined,
            isEditingRoute: false,
            durationSinceStart: 0,
            durationSinceLastClimb: 0,
        };
    }

    public componentDidMount() {
        const { navigation } = this.props;

        navigation.setParams({
            saveSession: this.saveSession.bind(this),
            cancelSession: this.showConfirmCancelAlert.bind(this),
        });
    }

    /** @description Prevents the timer render from interrupting the picker selection */
    public shouldComponentUpdate() {
        const { showLogClimbModal } = this.state;
        return !showLogClimbModal;
    }

    /** @description Prevents memory leak by cleaning up infinite interval */
    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    private onPreviousClimbPressed(climbKey: number): void {
        const { climbs } = this.state;

        const climb = climbs.find(c => c.key === climbKey);
        if (!climb) {
            return;
        }

        this.setState(prevState => ({
            ...prevState,
            isEditingRoute: true,
            climbSelected: {
                key: climb.key,
                route: climb.route,
                completed: climb.completed,
            },
        }), () => {
            this.showClimbModal();
        });
    }

    private setLogClimbModalVisible(visible: boolean) {
        this.setState({
            showLogClimbModal: visible,
        });
    }

    private getNextClimbKey() {
        this.key = this.key + 1;
        return this.key;
    }

    private goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    private discardSession() {
        this.goBack();
    }

    private async saveSession() {
        const {
            climbs,
            startTime,
        } = this.state;

        this.setState({
            endTime: Date.now(),
        });

        if (climbs.length > 0) {
            saveSessionToPhone(climbs, startTime);
        }

        this.goBack();
    }

    private saveEditedClimb(_key: number, newClimb: Climb) {
        const { climbs } = this.state;

        let updatedClimbs = climbs.slice();
        updatedClimbs = updatedClimbs.map((climb) => {
            if (climb.key === _key) {
                return {
                    ...climb,
                    route: newClimb.route,
                    completed: newClimb.completed,
                };
            }
            return climb;
        });

        this.setState({
            climbs: updatedClimbs,
        });
    }

    private saveNewClimb(newClimb: Climb) {
        this.setState(
            prevState => ({
                climbs: [...prevState.climbs, newClimb],
            }),
        );
    }

    private saveClimb(route: Route, sentIt: boolean, _key?: number): void {
        const newClimb: Climb = {
            key: _key || this.getNextClimbKey(),
            route: {
                difficulty: route.difficulty,
                type: route.type,
            },
            completed: sentIt,
        };

        if (_key) {
            this.setState({
                isEditingRoute: false,
            });
            this.saveEditedClimb(_key, newClimb);
        } else { // Add new climb
            this.saveNewClimb(newClimb);
        }

        this.setState(prevState => (
            {
                ...prevState,
                durationSinceLastClimb: 0,
            }
        ));
    }

    public hideClimbModal(): void {
        this.setLogClimbModalVisible(false);
    }

    public showClimbModal(): void {
        this.setLogClimbModalVisible(true);
    }

    private showConfirmCancelAlert(): void {
        const { climbs } = this.state;
        if (climbs.length === 0) {
            this.discardSession();
            return;
        }

        Alert.alert(
            'This action cannot be undone', // Title
            'Are you sure you want to discard this session?', // Alert message
            [ // Buttons
                {
                    text: 'Go Back',
                    onPress: undefined,
                    style: 'cancel',
                },
                {
                    text: 'Discard',
                    onPress: this.discardSession.bind(this),
                    style: 'destructive',
                },
            ],
        );
    }

    public render() {
        const {
            climbSelected,
            isEditingRoute,
            showLogClimbModal,
            climbs,
            durationSinceStart,
            durationSinceLastClimb,
        } = this.state;

        return (
            <View style={styles.container}>
                {climbs.length > 0
                    ? (
                        <TimerRow
                            secondsSinceLastClimb={durationSinceLastClimb}
                            totalSeconds={durationSinceStart}
                        />
                    )
                    : undefined
                }

                <ClimbList
                    data={climbs}
                    onRowPress={this.onPreviousClimbPressed}
                    selectedKey={(climbSelected && isEditingRoute) ? climbSelected.key : undefined}
                />

                <Button
                    fontColor={AppColors.white}
                    fontSize={26}
                    isEmphasized
                    onPress={this.showClimbModal}
                    style={styles.addButton}
                    title='Add climb'
                />

                <LogClimbModal
                    climbKey={climbSelected ? climbSelected.key : undefined}
                    hideModal={this.hideClimbModal}
                    isEditingRoute={isEditingRoute}
                    isVisible={showLogClimbModal}
                    routeSelected={climbSelected ? climbSelected.route : undefined}
                    saveClimb={this.saveClimb}
                />
            </View>
        );
    }
}

export default TrainingSessionView;
