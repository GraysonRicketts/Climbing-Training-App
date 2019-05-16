import React from 'react';
import { Component } from 'react';
import { 
    Text,
    StyleSheet,
    View,
    TextInput,
    Dimensions
} from 'react-native';
import { 
    TabView,
    SceneMap,
    NavigationState
} from 'react-native-tab-view';
import { Switch } from 'react-native-gesture-handler';
import ClimbPicker from '../components/ClimbPicker';
import Modal from 'react-native-modal';
import CLIMBING_TYPE from '../enums/ClimbingTypes';
import Button from '../components/Button';
import FRENCH_RATINGS from '../enums/FrenchRatings';
import YOSEMITE_RATINGS from '../enums/YosemiteRatings';
import HUECO_RATINGS from '../enums/HuecoRatings';
import FrenchRatings from '../enums/FrenchRatings';
import ClimbDifficultyRatings from '../enums/Ratings';
import { Route } from '../util/Climbs';


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        borderColor: '#AAA', // TODO: use project defined color
        borderTopWidth: 0.5,
        borderRadius: 0,
        backgroundColor: '#FFF', // TODO: use project defined color
        height: 400
    },
    exerciseSearch: {
        height: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderColor: '#BBB', // TODO: use project defined color
        borderTopWidth: 0.5,
        borderRadius: 0,
        fontSize: 20,
    },
    sentItRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3
    },
    sentItText: {
        flexGrow: 2,
        fontSize: 18
    },
    saveButton: {
        backgroundColor: '#0F992D', // TODO: use project defined color
        width: '100%',
        height: 95,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 50
    }
});

interface ILogClimbModalProps {
    isVisible: boolean
    saveClimb: Function
    hideModal: Function
    isEditingRoute: boolean
    routeSelected?: Route
    climbKey?: number
}

type NavigationStateKey = {
    key: string,
    title: string
}

interface ILogClimbModalState {
    searchText: string
    sentIt: boolean
    routeSelected: Route
    boulderGradeSelected: string
    yosemiteGradeSelected: string
    frenchGradeSelected: string
    navigationState: NavigationState<NavigationStateKey>
}

class LogClimbModal extends Component<ILogClimbModalProps, ILogClimbModalState> {
    constructor(props: ILogClimbModalProps) {
        super(props);
        
        this.state = {
            searchText: '',
            sentIt: true,
            routeSelected: { 
                difficulty: HUECO_RATINGS.V0,
                type: CLIMBING_TYPE.HUECO,
            },
            boulderGradeSelected: HUECO_RATINGS.V0,
            yosemiteGradeSelected: YOSEMITE_RATINGS['5.10a'],
            frenchGradeSelected: FrenchRatings[4],
            navigationState: {
                index: CLIMBING_TYPE.HUECO,
                routes: [
                    { key: 'first', title: 'Hueco' },
                    { key: 'second', title: 'Yosemite' },
                    { key: 'third', title: 'French' }
                ],
            },
        }
    }

    render() {
        const { isVisible } = this.props;
        const { 
            searchText,
            sentIt,
            navigationState,
            routeSelected
        } = this.state;
        
        return (
            <Modal
                style={styles.modal}
                isVisible={isVisible}
                onBackdropPress={() => this.hideModal() }
                swipeDirection='down'
                onSwipeComplete={() => this.hideModal() }
                avoidKeyboard={true}
            >
                <View style={styles.container} >
                    <View style={styles.sentItRow} >
                        <Text style={styles.sentItText}>
                            Sent it?
                        </Text>
                        <Switch
                            onValueChange={this._onSentSwitchChanged.bind(this)}
                            value={sentIt}
                        />
                    </View>

                    <TextInput
                        style={styles.exerciseSearch}
                        onChangeText={(text) => this._onSearchTextChanged(text)}
                        value={searchText}
                        numberOfLines={1}
                        placeholder={'🔍 Search'}
                        placeholderTextColor={'#AAA'} // TODO: use project defined color
                    />

                    <TabView
                        navigationState={navigationState}
                        renderScene={SceneMap({
                            first: () => (
                                <ClimbPicker
                                    routeSelected={routeSelected}
                                    items={this._getValuesForPicker(HUECO_RATINGS)}
                                    onValuedChange={this._onClimbSelectedChange.bind(this)}
                                    type={CLIMBING_TYPE.HUECO}
                                />
                            ),
                            second: () => (
                                <ClimbPicker
                                    routeSelected={routeSelected}
                                    items={this._getValuesForPicker(YOSEMITE_RATINGS)}
                                    onValuedChange={this._onClimbSelectedChange.bind(this)}
                                    type={CLIMBING_TYPE.HUECO}
                                />
                            ),
                            third: () => (
                                <ClimbPicker
                                    routeSelected={routeSelected}
                                    items={this._getValuesForPicker(FRENCH_RATINGS)}
                                    onValuedChange={this._onClimbSelectedChange.bind(this)}
                                    type={CLIMBING_TYPE.HUECO}
                                />
                            )
                        })}
                        onIndexChange={this._onTabChanged.bind(this)}
                        initialLayout={{ 
                            width: Dimensions.get('window').width,
                            height: 320
                        }}
                    />

                    <Button
                        title={'Save'}
                        onPress={this.saveClimb.bind(this)}
                        fontSize={20}
                        fontColor={'#FEFEFE'} // TODO: use project defined color
                        isEmphasized={true}
                        style={styles.saveButton}
                    />
                </View>
            </Modal>
        );
    }

      
    componentWillReceiveProps(props: ILogClimbModalProps) {
        this.setState(prevState => ({
            ...prevState,
            routeSelected: props.routeSelected ? props.routeSelected : prevState.routeSelected
        }));
    }

    saveClimb() {
        const { 
            saveClimb,
            climbKey
        } = this.props;
        const { 
            routeSelected,
            sentIt
        } = this.state;

        saveClimb(
            routeSelected,
            sentIt,
            climbKey
        );

        this.hideModal();
    }
        
    hideModal() {
        this.props.hideModal();
    }

    _onTabChanged(tabIndex: number) {
        this.setState(prevState => ({
            ...prevState,
            navigationState: {
                ...prevState.navigationState,
                index: tabIndex
            }
         }));

        let difficultySelected;
        if (tabIndex === CLIMBING_TYPE.HUECO) {
            difficultySelected = this.state.boulderGradeSelected;
        }
        else if (tabIndex === CLIMBING_TYPE.YOSEMITE) {
            difficultySelected = this.state.yosemiteGradeSelected;
        }
        else {
            difficultySelected = this.state.frenchGradeSelected;
        }

        this._onClimbSelectedChange(difficultySelected, tabIndex);
    }

    _onClimbSelectedChange(difficulty: string, type: CLIMBING_TYPE) {
        this.setState(prevState => ({
            ...prevState,
            routeSelected: {
                ...prevState.routeSelected,
                difficulty,
                type
            },
            boulderGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.HUECO 
                ? difficulty : prevState.boulderGradeSelected,
            yosemiteGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.YOSEMITE 
                ? difficulty : prevState.yosemiteGradeSelected,
            frenchGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.FRENCH
                ? difficulty : prevState.frenchGradeSelected,
        }));
    }

    _onSearchTextChanged(searchText: string) {
        this.setState(prevState => ({
            ...prevState,
            searchText
        }));
    }

    _onSentSwitchChanged(didSendRoute: boolean) {
        this.setState({ sentIt: didSendRoute });
    }

    _getValuesForPicker(values: ClimbDifficultyRatings): ClimbDifficultyRatings {
        const { 
            searchText
        } = this.state;

        if (!searchText) { // Don't do costly loop if no search
            return values;
        }

        let filteredValues: ClimbDifficultyRatings = {};
        for (const key in values) {
            if (key.includes(searchText)) {
                filteredValues[key] = key;
            }
        }

        return filteredValues;
    }
}

  export default LogClimbModal;