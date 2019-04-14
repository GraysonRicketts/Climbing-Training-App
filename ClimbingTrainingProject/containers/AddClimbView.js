/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, StyleSheet, Button, View, TextInput, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ClimbPicker from './ClimbPicker';
import Modal from 'react-native-modal';
import ClimbingTypes from './../enums/ClimbingTypes';
import { Switch } from 'react-native-gesture-handler';

const BoulderingValues = {
    V0: 'V0',
    V1: 'V1',
    V2: 'V2',
    V3: 'V3',
    V4: 'V4',
    V5: 'V5',
    V7: 'V6',
    V8: 'V7',
    V9: 'V8',
};

const YosemiteValues = {
    '5.9': '5.9',
    '5.10a': '5.10a',
    '5.10b': '5.10b',
    '5.10c': '5.10c',
    '5.11a': '5.11a',
    '5.11b': '5.11b',
    '5.11c': '5.11c',
    '5.12a': '5.12a',
    '5.12b': '5.12b',
    '5.12c': '5.12c',
};


export default class AddExerciseView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            sentIt: true,
            climbSelected: BoulderingValues.V0,
            boulderGradeSelected: BoulderingValues.V0,
            yosemiteGradeSelected: YosemiteValues['5.9'],
            navigationState: {
                index: ClimbingTypes.BOULDERING,
                routes: [
                    { key: 'first', title: 'Bouldering' },
                    { key: 'second', title: 'Yosemite' },
                ],
            }
        }
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
        if (index === ClimbingTypes.BOULDERING) {
            climbSelected = this.state.boulderGradeSelected;
        }
        else {
            climbSelected = this.state.yosemiteGradeSelected;
        }
        this.climbSelectedChanged(climbSelected);
    }

    climbSelectedChanged(value) {
        this.setState(prevState => ({
            ...prevState,
            climbSelected: value,
            boulderGradeSelected: prevState.navigationState.index === ClimbingTypes.BOULDERING 
                ? value : prevState.boulderGradeSelected,
            yosemiteGradeSelected: prevState.navigationState.index === ClimbingTypes.YOSEMITE 
                ? value : prevState.yosemiteGradeSelected
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
        this.props.saveClimb(this.state.climbSelected, this.state.ClimbPickerIndex);
        this.props.hideModal();
    }

    render() {
        return (
            <Modal
                style={styles.modal}
                visible={this.props.visible}
                animationType={'slide'}
                onRequestClose={this.props.hideModal}
            >
                <View
                    style={styles.container}
                >
                    <View
                        style={styles.sentItRow}
                    >
                        <Text
                            style={styles.sentItText}
                        >
                            Sent it?
                        </Text>
                        <Switch
                            onValueChange={this.toggleSentSwitch.bind(this)}
                            value={this.state.sentIt}
                        />
                    </View>

                    <TextInput
                        style={styles.exerciseSearch}
                        onChangeText={(text) => this.searchInputChanged(text).bind(this)}
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
                                    items={BoulderingValues}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            ),
                            second: () => (
                                <ClimbPicker
                                    climbSelected={this.state.climbSelected}
                                    items={YosemiteValues}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            ),
                        })}
                        onIndexChange={this.tabChanged.bind(this)}
                        initialLayout={{ 
                            width: Dimensions.get('window').width,
                            height: 320
                        }}
                    />

                    <Button
                        onPress={this.saveClimb.bind(this)}
                        title={'Save'}
                    ></Button>
                </View>
            </Modal>
        );
      }
}

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
        height: 350,
        paddingBottom: 30
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
    }
  });