/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';
import AddClimbView from './AddClimbView';
import { FlatList } from 'react-native-gesture-handler';

export default class TrainingSessionView extends Component {
    constructor(props) {
        super(props);
        this._key = 0;

        // TODO: track start time + end time
        this.state = {
            modalVisible: false,
            climbs: []
        }
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

    showAddExercise() {
        this._setModalVisible(true);
    }
    
    hideAddExercise() {
        this._setModalVisible(false);
    }

    saveClimb(climb, climbType) {
        const newClimb = {
            route: {
                key: this._getClimbingKey(),
                climbType,
                difficulty: climb
            }
        }
        this.setState(prevState => ({
            climbs: [...prevState.climbs, newClimb]
        }));
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

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Session training screen</Text>
            
            <FlatList
                data={this.state.climbs}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                ListEmptyComponent={renderEmptyComponent}
                style={styles.sectionList}
            />

            <Button
                onPress={this.showAddExercise.bind(this, this.props.navigation)}
                title={'Add'}
            ></Button>
            <AddClimbView
                style={styles.addClimbView}
                visible={this.state.modalVisible}
                hideModal={this.hideAddExercise.bind(this)}
                saveClimb={this.saveClimb.bind(this)}
            />
          </View>
        );
      }
}

function renderEmptyComponent() {
    const instructions = 'Add a climb by clicking the button below';

    return (<Text>{instructions}</Text>);
}

function renderItem(data) {
    const climb = data.item;
    const title = climb.route.difficulty;

    return (<Text style={styles.item}>{title}</Text>);
}

const styles = StyleSheet.create({
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
  });

