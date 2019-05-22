import React, { Component } from 'react';

import {
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
import Modal from 'react-native-modal';
import ClimbPicker from './ClimbPicker';
import CLIMBING_TYPE from '../enums/ClimbingTypes';
import Button from './Button';
import YOSEMITE_RATINGS from '../enums/YosemiteRatings';
import HUECO_RATINGS from '../enums/HuecoRatings';
import FRENCH_RATINGS from '../enums/FrenchRatings';
import ClimbDifficultyRatings from '../enums/Ratings';
import { Route, ClimbModifier } from '../util/Climbs';
import AppColors from '../enums/Colors';
import Images from '../assets/Images';
import ModifierButton from './ModifierButton';


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    screenContainer: {
        height: 400,
    },
    container: {
        borderColor: AppColors.lightGray,
        borderTopWidth: 0.5,
        borderRadius: 0,
        backgroundColor: AppColors.white,
        height: 400,
    },
    modifierButtonContainer: {
        flexDirection: 'row',
        flex: 1,
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
    climbModifier?: ClimbModifier;
}

interface NavigationStateKey {
    key: string;
    title: string;
}

interface LogClimbModalState {
    searchText: string;
    modifier: ClimbModifier;
    routeSelected: Route;
    boulderGradeSelected: string;
    yosemiteGradeSelected: string;
    frenchGradeSelected: string;
    difficultyPickerNavigationState: NavigationState<NavigationStateKey>;
    modalNavigationState: NavigationState<NavigationStateKey>;
}

class LogClimbModal extends Component<LogClimbModalProps, LogClimbModalState> {
    public constructor(props: LogClimbModalProps) {
        super(props);

        const {
            climbModifier,
            routeSelected,
        } = this.props;

        this.onTabChanged = this.onTabChanged.bind(this);
        this.onClimbSelectedChange = this.onClimbSelectedChange.bind(this);
        this.saveClimb = this.saveClimb.bind(this);
        this.moveToModifiersTab = this.moveToModifiersTab.bind(this);
        this.modifierClicked = this.modifierClicked.bind(this);

        this.state = {
            searchText: '',
            modifier: climbModifier || ClimbModifier.none,
            routeSelected: routeSelected || {
                difficulty: HUECO_RATINGS.V0,
                type: CLIMBING_TYPE.HUECO,
            },
            boulderGradeSelected: HUECO_RATINGS.V0,
            yosemiteGradeSelected: YOSEMITE_RATINGS['5.10a'],
            frenchGradeSelected: FRENCH_RATINGS[4],
            difficultyPickerNavigationState: {
                index: routeSelected ? routeSelected.type : CLIMBING_TYPE.HUECO,
                routes: [
                    { key: 'hueco', title: 'Hueco' },
                    { key: 'yosemite', title: 'Yosemite' },
                    { key: 'french', title: 'French' },
                ],
            },
            modalNavigationState: {
                index: 0,
                routes: [
                    { key: 'difficulty', title: 'difficulty' },
                    { key: 'modifiers', title: 'modifiers' },
                ],
            },
        };
    }

    private onTabChanged(tabIndex: number) {
        this.setState(prevState => ({
            ...prevState,
            difficultyPickerNavigationState: {
                ...prevState.difficultyPickerNavigationState,
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
            boulderGradeSelected: prevState.difficultyPickerNavigationState.index === CLIMBING_TYPE.HUECO
                ? difficulty : prevState.boulderGradeSelected,
            yosemiteGradeSelected: prevState.difficultyPickerNavigationState.index === CLIMBING_TYPE.YOSEMITE
                ? difficulty : prevState.yosemiteGradeSelected,
            frenchGradeSelected: prevState.difficultyPickerNavigationState.index === CLIMBING_TYPE.FRENCH
                ? difficulty : prevState.frenchGradeSelected,
        }));
    }

    private onSearchTextChanged(searchText: string) {
        this.setState(prevState => ({
            ...prevState,
            searchText,
        }));
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

    private createDifficultyPickerSceneMap(routeSelected: Route) {
        return SceneMap({
            hueco: () => (
                <ClimbPicker
                    items={this.getValuesForPicker(HUECO_RATINGS)}
                    onValuedChange={this.onClimbSelectedChange}
                    routeSelected={routeSelected}
                    type={CLIMBING_TYPE.HUECO}
                />
            ),
            yosemite: () => (
                <ClimbPicker
                    items={this.getValuesForPicker(YOSEMITE_RATINGS)}
                    onValuedChange={this.onClimbSelectedChange}
                    routeSelected={routeSelected}
                    type={CLIMBING_TYPE.YOSEMITE}
                />
            ),
            french: () => (
                <ClimbPicker
                    items={this.getValuesForPicker(FRENCH_RATINGS)}
                    onValuedChange={this.onClimbSelectedChange}
                    routeSelected={routeSelected}
                    type={CLIMBING_TYPE.FRENCH}
                />
            ),
        });
    }

    private moveToModifiersTab() {
        this.setState(prevState => ({
            ...prevState,
            modalNavigationState: {
                ...prevState.modalNavigationState,
                index: 1,
            },
        }));
    }

    private modifierClicked(modifier: ClimbModifier) {
        this.setState(prevState => ({
            ...prevState,
            modifier,
        }));
    }

    private createModalSceneMap() {
        const {
            searchText,
            routeSelected,
            difficultyPickerNavigationState,
            modifier,
        } = this.state;

        const difficultyPickerSceneMap = this.createDifficultyPickerSceneMap(routeSelected);

        return SceneMap({
            difficulty: () => (
                <View style={styles.screenContainer}>
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
                        navigationState={difficultyPickerNavigationState}
                        onIndexChange={this.onTabChanged}
                        renderScene={difficultyPickerSceneMap}
                    />

                    <Button
                        fontColor={AppColors.white}
                        fontSize={20}
                        isEmphasized
                        onPress={this.moveToModifiersTab}
                        style={styles.saveButton}
                        title='Next'
                    />
                </View>
            ),
            modifiers: () => (
                <View style={styles.screenContainer}>
                    <View style={styles.modifierButtonContainer}>
                        <ModifierButton
                            image={Images.warmUp}
                            isSelected={ClimbModifier.warmUp === modifier}
                            modifier={ClimbModifier.warmUp}
                            modifierClicked={() => this.modifierClicked(ClimbModifier.warmUp)}
                        />

                        <ModifierButton
                            image={Images.onSite}
                            isSelected={ClimbModifier.onSite === modifier}
                            modifier={ClimbModifier.onSite}
                            modifierClicked={() => this.modifierClicked(ClimbModifier.onSite)}
                        />
                    </View>
                    <View style={styles.modifierButtonContainer}>
                        <ModifierButton
                            image={Images.flash}
                            isSelected={ClimbModifier.flash === modifier}
                            modifier={ClimbModifier.flash}
                            modifierClicked={() => this.modifierClicked(ClimbModifier.flash)}
                        />

                        <ModifierButton
                            image={Images.redPoint}
                            isSelected={ClimbModifier.redPoint === modifier}
                            modifier={ClimbModifier.redPoint}
                            modifierClicked={() => this.modifierClicked(ClimbModifier.redPoint)}
                        />
                    </View>

                    <Button
                        fontColor={AppColors.white}
                        fontSize={20}
                        isEmphasized
                        onPress={this.saveClimb}
                        style={styles.saveButton}
                        title='Save'
                    />
                </View>
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
            modifier,
        } = this.state;

        saveClimb(
            routeSelected,
            modifier,
            climbKey,
        );
    }

    public render() {
        const { isVisible } = this.props;
        const { modalNavigationState } = this.state;

        const modalSceneMap = this.createModalSceneMap();

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
                    <TabView
                        initialLayout={{
                            width: Dimensions.get('window').width,
                            height: 400,
                        }}
                        navigationState={modalNavigationState}
                        onIndexChange={() => {}} // Controlled programmatically
                        renderScene={modalSceneMap}
                        renderTabBar={() => (undefined)} // Hides tabs
                    />
                </View>
            </Modal>
        );
    }
}

export default LogClimbModal;
