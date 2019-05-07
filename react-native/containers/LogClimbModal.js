/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ClimbPicker from '../components/ClimbPicker';
import Modal from 'react-native-modal';
import CLIMBING_TYPE from '../enums/ClimbingTypes';
import { Switch } from 'react-native-gesture-handler';
import Button from './../components/Button';
import FRENCH_RATINGS from './../enums/FrenchRatings';
import YOSEMITE_RATINGS from './../enums/YosemiteRatings';
import HUECO_RATINGS from './../enums/HuecoRatings';


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        borderColor: '#AAA',
        borderTopWidth: 0.5,
        borderRadius: 0,
        backgroundColor: '#FFF',
        height: 400
    },
    exerciseSearch: {
        height: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderColor: '#BBB',
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
        backgroundColor: '#0F992D',
        width: '100%',
        height: 95,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 50
    }
  });


class LogClimbModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            sentIt: props.sentIt ? props.sentIt : true,
            climbKey: undefined,
            climbSelected: props.climbSelected ? props.climbSelected : HUECO_RATINGS.V0,
            boulderGradeSelected: props.climbingType === CLIMBING_TYPE.HUECO ? props.climbSelected : HUECO_RATINGS.V0,
            yosemiteGradeSelected: props.climbingType === CLIMBING_TYPE.YOSEMITE ? props.climbSelected : YOSEMITE_RATINGS['5.9'],
            frenchGradeSelected: props.climbingType === CLIMBING_TYPE.FRENCH ? props.climbSelected : FRENCH_RATINGS['4'],
            navigationState: {
                index: props.climbingType ? props.climbingType : CLIMBING_TYPE.HUECO,
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
        
        return (
            <Modal
                style={styles.modal}
                isVisible={isVisible}
                animationType={'none'}
                onRequestClose={this.hideModal.bind(this)}
                onBackdropPress={this.hideModal.bind(this)}
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
                            onValueChange={this.toggleSentSwitch.bind(this)}
                            value={this.state.sentIt}
                        />
                    </View>

                    <TextInput
                        style={styles.exerciseSearch}
                        onChangeText={(text) => this.searchInputChanged(text)}
                        value={this.state.text}
                        numberOfLines={1}
                        placeholder={'🔍 Search'}
                        placeholderTextColor={'#AAA'}
                    />

                    <TabView
                        navigationState={this.state.navigationState}
                        renderScene={SceneMap({
                            first: () => (
                                <ClimbPicker
                                    climbSelected={this.state.climbSelected}
                                    items={this._getItemsForPicker(HUECO_RATINGS)}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            ),
                            second: () => (
                                <ClimbPicker
                                    climbSelected={this.state.climbSelected}
                                    items={this._getItemsForPicker(YOSEMITE_RATINGS)}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            ),
                            third: () => (
                                <ClimbPicker
                                    climbSelected={this.state.climbSelected}
                                    items={this._getItemsForPicker(FRENCH_RATINGS)}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            )
                        })}
                        onIndexChange={this.tabChanged.bind(this)}
                        initialLayout={{ 
                            width: Dimensions.get('window').width,
                            height: 320
                        }}
                    />

                    <Button
                        title={'Save'}
                        onPress={this.saveClimb.bind(this)}
                        fontSize={20}
                        fontColor={'#FEFEFE'}
                        isEmphasized={true}
                        style={styles.saveButton}
                    />
                </View>
            </Modal>
        );
      }

      
    componentWillReceiveProps(props) {
        this.setState(prevState => ({
            climbKey: props.climbKey,
            climbSelected: props.climbSelected ? props.climbSelected : prevState.climbSelected,
            boulderGradeSelected: props.climbingType === CLIMBING_TYPE.HUECO ? props.climbSelected : prevState.boulderGradeSelected,
            yosemiteGradeSelected: props.climbingType === CLIMBING_TYPE.YOSEMITE ? props.climbSelected : prevState.yosemiteGradeSelected,
            frenchGradeSelected: props.climbingType === CLIMBING_TYPE.FRENCH ? props.climbSelected : prevState.frenchGradeSelected,
        }));
    }
        
    hideModal() {
        this.props.hideModal();
    }

    tabChanged(index) {
        this.setState(prevState => ({
            ...prevState,
            navigationState: {
                ...prevState.navigationState,
                index
            }
         }));

        let climbSelected;
        if (index === CLIMBING_TYPE.HUECO) {
            climbSelected = this.state.boulderGradeSelected;
        }
        else if (index === CLIMBING_TYPE.YOSEMITE) {
            climbSelected = this.state.yosemiteGradeSelected;
        }
        else if (index === CLIMBING_TYPE.FRENCH) {
            climbSelected = this.state.frenchGradeSelected;
        }
        this.climbSelectedChanged(climbSelected);
    }

    climbSelectedChanged(value) {
        this.setState(prevState => ({
            ...prevState,
            climbSelected: value,
            boulderGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.HUECO 
                ? value : prevState.boulderGradeSelected,
            yosemiteGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.YOSEMITE 
                ? value : prevState.yosemiteGradeSelected,
            frenchGradeSelected: prevState.navigationState.index === CLIMBING_TYPE.FRENCH
                ? value : prevState.frenchGradeSelected,
        }));
    }

    searchInputChanged(text) {
        this.setState(prevState => ({
            ...prevState,
            text
        }));
    }

    toggleSentSwitch(value) {
        this.setState( { sentIt: value });
    }

    saveClimb() {
        this.props.saveClimb(
            this.state.climbSelected, 
            this.state.navigationState.index, 
            this.state.sentIt,
            this.state.climbKey);

        this.setState({climbKey: undefined});
        this.props.hideModal();
    }

    _getItemsForPicker(values) {
        if (!this.state.text) { // Don't do costly loop if no search
            return values;
        }

        let filteredValues = {};
        for (const key in values) {
            if (key.includes(this.state.text)) {
                filteredValues[key] = key;
            }
        }

        return filteredValues;
    }
}

  export default LogClimbModal;