import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Dimensions,
} from 'react-native';
import {
    TabView,
    SceneMap,
    NavigationState,
} from 'react-native-tab-view';
import { Switch } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ClimbPicker from './ClimbPicker';
import CLIMBING_TYPE from '../enums/ClimbingTypes';
import Button from './Button';
import YOSEMITE_RATINGS from '../enums/YosemiteRatings';
import HUECO_RATINGS from '../enums/HuecoRatings';
import FRENCH_RATINGS from '../enums/FrenchRatings';
import ClimbDifficultyRatings from '../enums/Ratings';
import { Route } from '../util/Climbs';
import AppColors from '../enums/Colors';


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        borderColor: AppColors.lightGray,
        borderTopWidth: 0.5,
        borderRadius: 0,
        backgroundColor: AppColors.white,
        height: 400,
    },
    exerciseSearch: {
        height: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderColor: AppColors.lightGray,
        borderTopWidth: 0.5,
        borderRadius: 0,
        fontSize: 20,
    },
    sentItRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3,
    },
    sentItText: {
        flexGrow: 2,
        fontSize: 18,
    },
    saveButton: {
        backgroundColor: AppColors.saveGreen,
        width: '100%',
        height: 95,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 50,
    },
});

interface LogClimbModalProps {
    isVisible: boolean;
    saveClimb: Function;
    hideModal: Function;
    isEditingRoute: boolean;
    routeSelected?: Route;
    climbKey?: number;
}

interface NavigationStateKey {
    key: string;
    title: string;
}

interface LogClimbModalState {
    searchText: string;
    sentIt: boolean;
    routeSelected: Route;
    boulderGradeSelected: string;
    yosemiteGradeSelected: string;
    frenchGradeSelected: string;
    navigationState: NavigationState<NavigationStateKey>;
}

class LogClimbModal extends Component<LogClimbModalProps, LogClimbModalState> {
    public constructor(props: LogClimbModalProps) {
        super(props);

        this.onSentSwitchChanged = this.onSentSwitchChanged.bind(this);
        this.onTabChanged = this.onTabChanged.bind(this);
        this.onClimbSelectedChange = this.onClimbSelectedChange.bind(this);
        this.saveClimb = this.saveClimb.bind(this);

        this.state = {
            searchText: '',
            sentIt: true,
            routeSelected: {
                difficulty: HUECO_RATINGS.V0,
                type: CLIMBING_TYPE.HUECO,
            },
            boulderGradeSelected: HUECO_RATINGS.V0,
            yosemiteGradeSelected: YOSEMITE_RATINGS['5.10a'],
            frenchGradeSelected: FRENCH_RATINGS[4],
            navigationState: {
                index: CLIMBING_TYPE.HUECO,
                routes: [
                    { key: 'first', title: 'Hueco' },
                    { key: 'second', title: 'Yosemite' },
                    { key: 'third', title: 'French' },
                ],
            },
        };
    }

    public componentWillReceiveProps(props: LogClimbModalProps) {
        this.setState(prevState => ({
            ...prevState,
            routeSelected: props.routeSelected ? props.routeSelected : prevState.routeSelected,
        }));
    }

    private onTabChanged(tabIndex: number) {
        this.setState(prevState => ({
            ...prevState,
            navigationState: {
                ...prevState.navigationState,
                index: tabIndex,
            },
        }), () => {
            const {
                boulderGradeSelected,
                yosemiteGradeSelected,
                frenchGradeSelected,
            } = this.state;

            let difficultySelected;
            if (tabIndex === CLIMBING_TYPE.HUECO) {
                difficultySelected = boulderGradeSelected;
            } else if (tabIndex === CLIMBING_TYPE.YOSEMITE) {
                difficultySelected = yosemiteGradeSelected;
            } else {
                difficultySelected = frenchGradeSelected;
            }

            this.onClimbSelectedChange(difficultySelected, tabIndex);
        });
    }

    private onClimbSelectedChange(difficulty: string, type: CLIMBING_TYPE) {
        this.setState(prevState => ({
            ...prevState,
            routeSelected: {
                ...prevState.routeSelected,
                difficulty,
                type,
            },
            boulderGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.HUECO
                ? difficulty : prevState.boulderGradeSelected,
            yosemiteGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.YOSEMITE
                ? difficulty : prevState.yosemiteGradeSelected,
            frenchGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.FRENCH
                ? difficulty : prevState.frenchGradeSelected,
        }));
    }

    private onSearchTextChanged(searchText: string) {
        this.setState(prevState => ({
            ...prevState,
            searchText,
        }));
    }

    private onSentSwitchChanged(didSendRoute: boolean) {
        this.setState({ sentIt: didSendRoute });
    }

    private getValuesForPicker(values: ClimbDifficultyRatings): ClimbDifficultyRatings {
        const {
            searchText,
        } = this.state;

        // Don't do costly loop if no search (default case)
        if (!searchText) {
            return values;
        }

        const filteredValues: ClimbDifficultyRatings = {};
        Object.keys(values).forEach((difficulty) => {
            if (difficulty.includes(searchText)) {
                filteredValues[difficulty] = difficulty;
            }
        });

        return filteredValues;
    }

    private createSceneMap(routeSelected: Route) {
        return SceneMap({
            first: () => (
                <ClimbPicker
                    items={this.getValuesForPicker(HUECO_RATINGS)}
                    onValuedChange={this.onClimbSelectedChange}
                    routeSelected={routeSelected}
                    type={CLIMBING_TYPE.HUECO}
                />
            ),
            second: () => (
                <ClimbPicker
                    items={this.getValuesForPicker(YOSEMITE_RATINGS)}
                    onValuedChange={this.onClimbSelectedChange}
                    routeSelected={routeSelected}
                    type={CLIMBING_TYPE.HUECO}
                />
            ),
            third: () => (
                <ClimbPicker
                    items={this.getValuesForPicker(FRENCH_RATINGS)}
                    onValuedChange={this.onClimbSelectedChange}
                    routeSelected={routeSelected}
                    type={CLIMBING_TYPE.HUECO}
                />
            ),
        });
    }

    public hideModal() {
        const { hideModal } = this.props;
        hideModal();
    }

    public saveClimb() {
        const {
            saveClimb,
            climbKey,
        } = this.props;
        const {
            routeSelected,
            sentIt,
        } = this.state;

        saveClimb(
            routeSelected,
            sentIt,
            climbKey,
        );

        this.hideModal();
    }

    public render() {
        const { isVisible } = this.props;
        const {
            searchText,
            sentIt,
            navigationState,
            routeSelected,
        } = this.state;

        const sceneMap = this.createSceneMap(routeSelected);

        return (
            <Modal
                avoidKeyboard
                isVisible={isVisible}
                onBackdropPress={() => this.hideModal()}
                onSwipeComplete={() => this.hideModal()}
                style={styles.modal}
                swipeDirection='down'
            >
                <View style={styles.container}>
                    <View style={styles.sentItRow}>
                        <Text style={styles.sentItText}>
                            Sent it?
                        </Text>
                        <Switch
                            onValueChange={this.onSentSwitchChanged}
                            value={sentIt}
                        />
                    </View>

                    <TextInput
                        numberOfLines={1}
                        onChangeText={text => this.onSearchTextChanged(text)}
                        placeholder='🔍 Search'
                        placeholderTextColor={AppColors.lightGray}
                        style={styles.exerciseSearch}
                        value={searchText}
                    />

                    <TabView
                        initialLayout={{
                            width: Dimensions.get('window').width,
                            height: 320,
                        }}
                        navigationState={navigationState}
                        onIndexChange={this.onTabChanged}
                        renderScene={sceneMap}
                    />

                    <Button
                        fontColor={AppColors.white}
                        fontSize={20}
                        isEmphasized
                        onPress={this.saveClimb}
                        style={styles.saveButton}
                        title='Save'
                    />
                </View>
            </Modal>
        );
    }
}

export default LogClimbModal;
