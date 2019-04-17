/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, TextInput, View} from 'react-native';
import LogClimbModal from './LogClimbModal';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import ClimbDataRow from './../components/ClimbDataRow';
import NoClimbsComponent from './../components/NoClimbsComponent';
import SessionHeaderButton from './../components/SessionHeaderButton';
import formatDate_MMMM_DD_YYYY from './../helpers/DateFormatter';
import ConfirmModal from '../components/ConfirmModal';

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
    },
    titleInput: {
        height: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderColor: '#BBB',
        borderBottomWidth: 0.5,
        borderRadius: 0,
        fontSize: 20,
        backgroundColor: '#FDFDFD'
    }
}));

class TrainingSessionView extends Component {
    constructor(props) {
        super(props);
        this._key = 0;

        this.state = {
            startTime: Date.now(),
            endTime: undefined,
            showLogClimbModal: false,
            climbs: [],
            climbSelected: {
                difficulty: undefined,
                type: undefined,
                key: undefined
            },
            title: formatDate_MMMM_DD_YYYY(Date.now()),
            showCancelModal: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={(text) => this.titleInputChanged(text)}
                    value={this.state.title}
                    numberOfLines={1}
                />

                <ConfirmModal 
                    confirmDialog='Are you sure you want to discard this session? This action cannot be undone.'
                    cancelText='Go back'
                    confirmText='Discard this session'
                    confirmAction={this._goBack.bind(this)}
                    cancelAction={() => {this.setState({ showCancelModal: false})}}
                    isVisible={this.state.showCancelModal}
                />

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
                    ListEmptyComponent={<NoClimbsComponent />}
                    style={styles.sectionList}
                />

                <Button
                    onPress={this.showClimbModal.bind(this, this.props.navigation)}
                    title={'Add'}
                ></Button>
                <LogClimbModal
                    style={styles.addClimbView}
                    isVisible={this.state.showLogClimbModal}
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
            saveSession: this.saveSession.bind(this),
            cancelSession: this.setState({ showCancelModal: true })
        })
    }

    titleInputChanged(text) {
        this.setState({
            title: text
        });
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
            let sessionKey = this.state.startTime.toString();
            if (this.state.title) {
                sessionKey += `^${this.state.title}`;
            }
    
            try {
                await AsyncStorage.setItem(sessionKey, sessionStringified);
            } catch(error) {
                console.error(error);
            }
        }

        this._goBack();
    }
    
    _goBack() {
        this.props.navigation.goBack();
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

    static navigationOptions(navigationState) {
        const navigation = navigationState.navigation;
        
        return {
            headerLeft: <SessionHeaderButton
                title={'Discard session'}
                navigation={navigation}
                navigationParam={'cancelSession'}
                isCancel={true}
            />,
            headerRight: <SessionHeaderButton 
                title={'Save session'}
                navigation={navigation}
                navigationParam={'saveSession'}
            />
        }
    }
}

export default TrainingSessionView;