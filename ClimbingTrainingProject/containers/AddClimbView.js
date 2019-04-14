/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, View, TextInput, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ClimbPicker from './ClimbPicker';
import Modal from 'react-native-modal';

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

const ClimbPickerIndex = {
    BOULDERING: 0,
    YOSEMITE: 1
}

export default class AddExerciseView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            climbSelected: BoulderingValues.V0,
            boulderGradeSelected: BoulderingValues.V0,
            yoesmiteGradeSelected: YosemiteValues['5.9'],
            navigationState: {
                index: ClimbPickerIndex.BOULDERING,
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
        if (index === ClimbPickerIndex.BOULDERING) {
            climbSelected = this.state.boulderGradeSelected;
        }
        else {
            climbSelected = this.state.yoesmiteGradeSelected;
        }
        this.climbSelectedChanged(climbSelected);
    }

    climbSelectedChanged(value) {
        this.setState(prevState => ({
            ...prevState,
            climbSelected: value,
            boulderGradeSelected: prevState.navigationState.index === ClimbPickerIndex.BOULDERING 
                ? value : prevState.boulderGradeSelected,
            yoesmiteGradeSelected: prevState.navigationState.index === ClimbPickerIndex.YOSEMITE 
                ? value : prevState.yoesmiteGradeSelected
        }));
    }

    searchInputChanged(text) {
        this.setState(prevState => ({
            ...prevState,
            text
        }));
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
                        onPress={this.props.hideModal}
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
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 20,
    }
  });