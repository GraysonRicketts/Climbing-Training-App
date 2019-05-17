import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {
    NavigationScreenProps,
    NavigationStackScreenOptions,
} from 'react-navigation';
import LogClimbModal from '../components/LogClimbModal';
import SessionHeaderButton from '../components/SessionHeaderButton';
import { formatDateMMMMDDYYYY } from '../util/DateFormatter';
import Button from '../components/Button';
import ClimbList from '../components/ClimbList';
import {
    Climb,
    Route,
} from '../util/Climbs';
import { saveSessionToPhone } from '../util/PersistentStore';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
    },
    titleInput: {
        height: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderColor: AppColors.lightGray,
        borderBottomWidth: 0.5,
        borderRadius: 0,
        fontSize: 20,
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
    title: string;
    isEditingRoute: boolean;
}

class TrainingSessionView extends Component<NavigationScreenProps, TrainingSessionViewState> {
    public static navigationOptions(navigationState: NavigationScreenProps): NavigationStackScreenOptions {
        const { navigation } = navigationState;

        return {
            headerLeft: <SessionHeaderButton
                isCancel
                navigation={navigation}
                navigationParam='cancelSession'
                title='Discard session'
            />,
            headerRight: <SessionHeaderButton
                navigation={navigation}
                navigationParam='saveSession'
                title='Save session'
            />,
        };
    }

    private key: number;

    public constructor(props: NavigationScreenProps) {
        super(props);

        this.key = 0;

        this.onPreviousClimbPressed = this.onPreviousClimbPressed.bind(this);
        this.showClimbModal = this.showClimbModal.bind(this);
        this.hideClimbModal = this.hideClimbModal.bind(this);
        this.saveClimb = this.saveClimb.bind(this);

        this.state = {
            startTime: Date.now(),
            endTime: undefined,
            showLogClimbModal: false,
            climbs: [],
            climbSelected: undefined,
            title: formatDateMMMMDDYYYY(Date.now()),
            isEditingRoute: false,
        };
    }

    public componentDidMount() {
        const { navigation } = this.props;

        navigation.setParams({
            saveSession: this.saveSession.bind(this),
            cancelSession: this.showConfirmCancelAlert.bind(this),
        });
    }

    private onTitleInputChanged(text: string): void {
        this.setState({
            title: text,
        });
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
            title,
            startTime,
        } = this.state;

        this.setState({
            endTime: Date.now(),
        });

        if (climbs.length > 0) {
            saveSessionToPhone(climbs, startTime, title);
        }

        this.goBack();
    }

    private editClimb(_key: number, newClimb: Climb) {
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
            this.editClimb(_key, newClimb);
        } else { // Add new climb
            this.saveNewClimb(newClimb);
        }
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
            title,
            climbs,
        } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    numberOfLines={1}
                    onChangeText={text => this.onTitleInputChanged(text)}
                    style={styles.titleInput}
                    value={title}
                />

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
