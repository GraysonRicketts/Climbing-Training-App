import React from 'react';
import { Component } from 'react';
import { 
    Alert,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LogClimbModal from './LogClimbModal';
import SessionHeaderButton from '../components/SessionHeaderButton';
import { formatDate_MMMM_DD_YYYY } from './../util/DateFormatter';
import Button from '../components/Button';
import ClimbList from '../components/ClimbList';
import { 
    Climb,
    Route
} from '../util/Climbs';

const styles = (StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF', // TODO: Use project defined color
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
        borderColor: '#BBB', // TODO: Use project defined color
        borderBottomWidth: 0.5,
        borderRadius: 0,
        fontSize: 20,
        backgroundColor: '#FDFDFD' // TODO: Use project defined color
    },
    addButton: {
        backgroundColor: '#64C373', // TODO: Use project defined color
        width: '100%',
        height: 100,
        paddingTop: 20,
        paddingBottom: '4%'
    }
}));

interface ITrainingSessionViewProps {
    navigation: any // TODO: typecheck
}

interface ITrainingSessionViewState {
    startTime: number
    endTime?: number
    showLogClimbModal: boolean
    climbs: Climb[]
    climbSelected?: Climb
    title: string
    isEditingRoute: boolean
}

class TrainingSessionView extends Component<ITrainingSessionViewProps, ITrainingSessionViewState> {
    _key: number;

    constructor(props: ITrainingSessionViewProps) {
        super(props);
        
        this._key = 0;

        this.state = {
            startTime: Date.now(),
            endTime: undefined,
            showLogClimbModal: false,
            climbs: [],
            climbSelected: undefined,
            title: formatDate_MMMM_DD_YYYY(Date.now()),
            isEditingRoute: false
        }
    }

    render() {
        const {
            climbSelected,
            isEditingRoute
        } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={(text) => this._onTitleInputChanged(text)}
                    value={this.state.title}
                    numberOfLines={1}
                />
                
                <ClimbList 
                    data={this.state.climbs}
                    selectedKey={(climbSelected && isEditingRoute) ? climbSelected.key : undefined}
                    onRowPress={this.onPreviousClimbPressed.bind(this)}
                />

                <Button
                    title={'Add climb'}
                    onPress={this.showClimbModal.bind(this, this.props.navigation)}
                    fontSize={26}
                    fontColor={'#FEFEFE'} // TODO: Use project defined color
                    isEmphasized={true}
                    style={styles.addButton}
                />
                
                <LogClimbModal
                    isVisible={this.state.showLogClimbModal}
                    hideModal={this.hideClimbModal.bind(this)}
                    saveClimb={this.saveClimb.bind(this)}
                    routeSelected={climbSelected ? climbSelected.route : undefined}
                    isEditingRoute={isEditingRoute}
                    climbKey={climbSelected ? climbSelected.key : undefined}
                />
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.setParams({
            saveSession: this.saveSession.bind(this),
            cancelSession: this._showConfirmCancelAlert.bind(this)
        })
    }

    _onTitleInputChanged(text: string): void {
        this.setState({
            title: text
        });
    }

    _showConfirmCancelAlert(): void {
        if (this.state.climbs.length === 0) {
            this.discardSession();
            return;
        }

        Alert.alert(
            'This action cannot be undone', // Title
            'Are you sure you want to discard this session?', // Alert message
            [ // Buttons
                {
                    text: 'Go Back',
                    onPress: undefined,
                    style: 'cancel'
                },
                {
                    text: 'Discard',
                    onPress: this.discardSession.bind(this),
                    style: 'destructive'
                },
            ]
        );
    }

    showClimbModal(): void {
        this._setLogClimbModalVisible(true);
    }
    
    hideClimbModal(): void {
        this._setLogClimbModalVisible(false);
    }

    onPreviousClimbPressed(climbKey: number): void {
        const climb = this.state.climbs.find(climb => climb.key === climbKey);
        if (!climb) {
            console.error('Tried to edit a climb but no climb was found');
            return;
        }

        this.setState((prevState) => ({
            ...prevState,
            isEditingRoute: true,
            climbSelected: {
                key: climb.key,
                route: climb.route,
                completed: climb.completed
            }
        }), () => {
            this.showClimbModal();
        });
    }

    saveClimb(route: Route, sentIt: boolean, _key?: number): void {
        const newClimb: Climb = {
            key: _key ? _key : this._getClimbingKey(),
            route: {
                difficulty: route.difficulty,
                type: route.type
            },
            completed: sentIt,
        };
        
        if (_key) {
            this.setState({
                isEditingRoute: false
            });
            this._editClimb(_key, newClimb);
        }
        else { // Add new climb
            this._saveNewClimb(newClimb);
        }
    }

    _saveNewClimb(newClimb: Climb) {
        this.setState(
            prevState => ({
                climbs: [...prevState.climbs, newClimb]
            })
        )
    }

    _editClimb(_key: number, newClimb: Climb) {
        let updatedClimbs = this.state.climbs.slice();
        updatedClimbs = updatedClimbs.map((climb) => {
            if (climb.key === _key) {
                return {
                    ...climb,
                    route: newClimb.route,
                    completed: newClimb.completed
                };
            }
            return climb;
        });

        this.setState({
            climbs: updatedClimbs
        });
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

    discardSession() {
        this._goBack();
    }
    
    _goBack() {
        this.props.navigation.goBack();
    }

    _setLogClimbModalVisible(visible: boolean) {
        this.setState({
            showLogClimbModal: visible
        })
    }

    _getClimbingKey() {
        this._key = this._key + 1;
        return this._key;
    }

    static navigationOptions(navigationState: any) { // TODO: typecheck
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