/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';
import LogClimbModal from './LogClimbModal';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

export default class TrainingSessionView extends Component {
    constructor(props) {
        super(props);
        this._key = 0;

        // TODO: track start time + end time
        this.state = {
            startTime: Date.now(),
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
            <View style={TrainingSessionView.styles.container}>
                <FlatList
                    data={this.state.climbs}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={this.renderClimb.bind(this)}
                    ListEmptyComponent={TrainingSessionView.renderEmptyComponent}
                    style={TrainingSessionView.styles.sectionList}
                />

                <Button
                    onPress={this.showClimbModal.bind(this, this.props.navigation)}
                    title={'Add'}
                ></Button>
                <LogClimbModal
                    style={TrainingSessionView.styles.addClimbView}
                    visible={this.state.modalVisible}
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

    saveSession() {
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

    renderClimb(data) {
        const climb = data.item;
        const title = climb.route.difficulty;
        const sentIt = climb.sentIt;
        const key = climb.key;
    
        return (
            <TouchableHighlight 
                onPress={this.editClimb.bind(this, climb.key)}
                underlayColor={'#F5FCFF'}
                activeOpacity={0.5}
                style={key === this.state.climbSelected.key ? { backgroundColor: '#73C2FB'} : undefined }
            >
                <View style={TrainingSessionView.styles.climbRow}>
                    <Text style={TrainingSessionView.styles.climbDifficulty}>
                        {title}
                    </Text>
                    <Text style={TrainingSessionView.styles.climbSent}>
                        {sentIt ? '✔️' : '❌'}
                    </Text>
                </View>
            </TouchableHighlight>
        );
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

    static get styles() {
        return (StyleSheet.create({
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
            sectionHeader: {
                paddingTop: 2,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 2,
                fontSize: 14,
                fontWeight: 'bold',
                backgroundColor: 'rgba(247,247,247,1.0)',
            },
            sectionList: {
                flexGrow: 2
            },
            item: {
                padding: 10,
                fontSize: 18,
                height: 44,
            },
            climbRow: {
                flexDirection: 'row',
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 5,
                paddingBottom: 5,
                borderColor: '#AAA',
                borderRadius: 0,
                borderBottomWidth: 0.5
            },
            climbDifficulty: {
                fontSize: 20,
                flexGrow: 2
            },
            climbSent: {
                fontSize: 20
            }
        }));
    }
}