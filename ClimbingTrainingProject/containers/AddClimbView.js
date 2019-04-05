/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Picker, Button, Text, View, TextInput, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ClimbPicker from './ClimbPicker';
import Modal from 'react-native-modal';

const BoulderingValues = [
    {
        label: 'V1',
        value: '1'
    },
    {
        label: 'V2',
        value: '2'
    },
    {
        label: 'V3',
        value: '3'
    },
    {
        label: 'V4',
        value: '4'
    },
    {
        label: 'V5',
        value: '5'
    },
    {
        label: 'V6',
        value: '6'
    },
    {
        label: 'V7',
        value: '7'
    }
];

const YosemiteValues = [
    {
        label: '5.6',
        value: '5.6'
    },
    {
        label: '5.7',
        value: '5.7'
    },
    {
        label: '5.8',
        value: '5.8'
    },
    {
        label: '5.9',
        value: '5.9'
    },
    {
        label: '5.10a',
        value: '5.10a'
    },
    {
        label: '5.10b',
        value: '5.10b'
    },
    {
        label: '5.10c',
        value: '5.10c'
    },
    {
        label: '5.11a',
        value: '5.11a'
    },
    {
        label: '5.11b',
        value: '5.11b'
    },
    {
        label: '5.11c',
        value: '5.11c'
    }
];

export default class AddExerciseView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            type: climbTypes.BOULDER,
            selectedValue: null,
            navigationState: {
                index: 0,
                routes: [
                    { key: 'first', title: 'Bouldering' },
                    { key: 'second', title: 'Yosemite' },
                ],
            }
        }
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
                        onChangeText={(text) => this.setState({text})}
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
                                    selectedValue={this.state.selectedValue}
                                    items={BoulderingValues}
                                />
                            ),
                            second: () => (
                                <ClimbPicker
                                    selectedValue={this.state.selectedValue}
                                    items={YosemiteValues}
                                />
                            ),
                        })}
                        onIndexChange={index => this.setState({ index })}
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

const climbTypes = {
    TR: 'top-rope',
    BOULDER: 'bouldering',
    SPORT: 'sport',
    TRAD: 'traditional'
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
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