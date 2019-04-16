/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';
import LogClimbModal from './LogClimbModal';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import ClimbDataRow from './../components/ClimbDataRow';

const styles = (StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        paddingBottom: '5%'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    climbList: {
        flexGrow: 2
    }
}));

class TrainingSessionView extends Component {
    constructor(props) {
        super(props);
        this._key = 0;

        this.state = {
            startTime: Date.now(),
            endTime: undefined,
            modalVisible: false,
            climbs: [],
            climbSelected: {
                difficulty: undefined,
                type: undefined,
                key: undefined
            },
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.climbs}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={(data) => (
                        <ClimbDataRow 
                            difficulty={data.item.route.difficulty}
                            sentIt={data.item.sentIt}
                            isSelected={data.item.key === this.state.climbSelected.key}
                            onPress={this.editClimb.bind(this, data.item.key)}
                        />
                    )}
                    ListEmptyComponent={TrainingSessionView.renderEmptyComponent}
                    style={styles.sectionList}
                />

                <Button
                    onPress={this.showClimbModal.bind(this, this.props.navigation)}
                    title={'Add'}
                ></Button>
                <LogClimbModal
                    style={styles.addClimbView}
                    isVisible={this.state.modalVisible}
                    hideModal={this.hideClimbModal.bind(this)}
                    saveClimb={this.saveClimb.bind(this)}
                    climbSelected={this.state.climbSelected.difficulty}
                    climbingType={this.state.climbSelected.type}
                    climbKey={this.state.climbSelected.key}
                />
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.setParams({
            saveSession: this.saveSession.bind(this)
        })
    }

    showClimbModal() {
        this._setModalVisible(true);
    }
    
    hideClimbModal() {
        this._setModalVisible(false);
    }

    editClimb(climbKey) {
        const climb = this.state.climbs.find(climb => climb.key === climbKey);

        if (climb) {
            this.setState((prevState) => ({
                ...prevState,
                climbSelected: {
                    key: climb.key,
                    difficulty: climb.route.difficulty,
                    type: climb.route.climbType,
                    sentIt: climb.sentIt
                }
            }))
        }
        else {
            // TODO: log error that unable to edit climb
        }

        this.showClimbModal();
    }

    saveClimb(climb, climbType, sentIt, _key) {
        const newClimb = {
            key: _key ? _key : this._getClimbingKey(),
            route: {
                climbType: climbType,
                difficulty: climb
            },
            sentIt,
        }

        
        if (_key) { // Edit existing climb
            let updatedClimbs = this.state.climbs.slice();
            updatedClimbs = updatedClimbs.map((climb) => {
                if (climb.key === _key) {
                    return {
                        ...climb,
                        route: newClimb.route,
                        sentIt: newClimb.sentIt
                    }
                }

                return climb;
            })

            this.setState(prevState => ({ 
                climbs: updatedClimbs,
                climbSelected: {
                    ...prevState.climbSelected,
                    key: undefined
                }
            }));
        }
        else { // Add new climb
            this.setState(prevState => ({
                climbs: [...prevState.climbs, newClimb]
            }));
        }
        // {
        //     key: 1,
        //     route: {
        //         climbType: climbTypes.BOULDER,
        //         name: 'The Godfather',
        //         difficulty: 'V4',
        //         location: {x: 21, y: 43}
        //     },
        //     attempts: 1,
        //     climbed: true
        // }
    }

    async saveSession() {
        this.setState({
            endTime: Date.now()
        })

        if (this.state.climbs.length > 0) {
            const sessionStringified = JSON.stringify(this.state.climbs);
            const sessionKey = Date.now().toString();
    
            try {
                await AsyncStorage.setItem(sessionKey, sessionStringified);
            } catch(error) {
                console.error(error);
            }
        }

        this.props.navigation.goBack();
    }

    updateSecondsSinceStarted() {
        this.setState(prevState => ({
            secondsSinceStarted: prevState.secondsSinceStarted + 1
        }));
    }

    _setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    _getClimbingKey() {
        this._key = this._key + 1;
        return this._key;
    }

    static renderEmptyComponent() {
        const instructions = 'Add a climb by clicking the button below';
    
        return (<Text>{instructions}</Text>);
    }

    static renderSaveSessionComponent(navigation) {
        return (
            <Button
                title='Save workout'
                onPress={navigation.getParam('saveSession')}
            />
        );
    }

    static navigationOptions(navigationState) {
        const navigation = navigationState.navigation;
        const saveSessionButton = TrainingSessionView.renderSaveSessionComponent(navigation);
        
        return {
            headerLeft: <Text></Text>,
            headerRight: saveSessionButton
        }
    }
}

export default TrainingSessionView;