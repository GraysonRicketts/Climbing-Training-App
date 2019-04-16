/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, StyleSheet, Button, View, TextInput, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ClimbPicker from '../components/ClimbPicker';
import Modal from 'react-native-modal';
import ClimbingTypes from '../enums/ClimbingTypes';
import { Switch } from 'react-native-gesture-handler';

const BoulderingValues = {
    V0: 'V0',
    V1: 'V1',
    V2: 'V2',
    V3: 'V3',
    V4: 'V4',
    V5: 'V5',
    V6: 'V6',
    V7: 'V7',
    V8: 'V8',
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

const FrenchValues = {
    '4': '4',
    '5': '5',
    '5+': '5+',
    '6a': '6a',
    '6a+': '6a+',
    '6b': '6b',
    '6b+': '6b+',
    '6c': '6c',
    '6c+': '6c+',
    '7a': '7a',
    '7a+': '7a+',
    '7b': '7b',
    '7b+': '7b+',
    '7c': '7c',
    '7c+': '7c+',
    '8a': '8a',
    '8a+': '8a+',
    '8b': '8b',
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


class LogClimbModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            sentIt: props.sentIt ? props.sentIt : true,
            climbKey: undefined,
            climbSelected: props.climbSelected ? props.climbSelected : BoulderingValues.V0,
            boulderGradeSelected: props.climbingType === ClimbingTypes.BOULDERING ? props.climbSelected : BoulderingValues.V0,
            yosemiteGradeSelected: props.climbingType === ClimbingTypes.YOSEMITE ? props.climbSelected : YosemiteValues['5.9'],
            frenchGradeSelected: props.climbingType === ClimbingTypes.FRENCH ? props.climbSelected : FrenchValues['4'],
            navigationState: {
                index: props.climbingType ? props.climbingType : ClimbingTypes.BOULDERING,
                routes: [
                    { key: 'first', title: 'Bouldering' },
                    { key: 'second', title: 'Yosemite' },
                    { key: 'third', title: 'French' }
                ],
            },
        }
    }

    render() {
        return (
            <Modal
                style={styles.modal}
                isVisible={this.props.isVisible}
                animationType={'slide'}
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
                                    items={this._getItemsForPicker(BoulderingValues)}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            ),
                            second: () => (
                                <ClimbPicker
                                    climbSelected={this.state.climbSelected}
                                    items={this._getItemsForPicker(YosemiteValues)}
                                    valueChanged={this.climbSelectedChanged.bind(this)}
                                />
                            ),
                            third: () => (
                                <ClimbPicker
                                    climbSelected={this.state.climbSelected}
                                    items={this._getItemsForPicker(FrenchValues)}
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
                        onPress={this.saveClimb.bind(this)}
                        title={'Save'}
                    />
                </View>
            </Modal>
        );
      }

      
    componentWillReceiveProps(props) {
        this.setState(prevState => ({
            climbKey: props.climbKey,
            climbSelected: props.climbSelected ? props.climbSelected : BoulderingValues.V0,
            boulderGradeSelected: props.climbingType === ClimbingTypes.BOULDERING ? props.climbSelected : prevState.boulderGradeSelected,
            yosemiteGradeSelected: props.climbingType === ClimbingTypes.YOSEMITE ? props.climbSelected : prevState.yosemiteGradeSelected,
            frenchGradeSelected: props.climbingType === ClimbingTypes.FRENCH ? props.climbSelected : prevState.frenchGradeSelected,
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
        if (index === ClimbingTypes.BOULDERING) {
            climbSelected = this.state.boulderGradeSelected;
        }
        else if (index === ClimbingTypes.YOSEMITE) {
            climbSelected = this.state.yosemiteGradeSelected;
        }
        else if (index === ClimbingTypes.FRENCH) {
            climbSelected = this.state.frenchGradeSelected;
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
                ? value : prevState.yosemiteGradeSelected,
            frenchGradeSelected: prevState.navigationState.index === ClimbingTypes.FRENCH
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