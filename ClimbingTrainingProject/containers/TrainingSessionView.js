/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, SectionList, Button, Text, View} from 'react-native';
import AddClimbView from './AddClimbView';

export default class TrainingSessionView extends Component {
    constructor(props) {
        super(props);

        // TODO: track start time + end time
        this.state = {
            modalVisible: false
        }
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    showAddExercise(navigation) {
        //navigation.navigate('AddModal');
        this.setModalVisible(true);
    }
    
    hideAddExercise() {
        this.setModalVisible(false);
    }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Session training screen</Text>
            
            <SectionList
                sections={itemsData}
                renderItem={renderItem}
                renderSectionHeader={renderHeader}
                keyExtractor={(_, index) => index}
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
            />
          </View>
        );
      }
}


function renderHeader(data) {
    const section = data.section;
    const title = section.title;

    return (<Text style={styles.sectionHeader}>{title}</Text>);
}

function renderItem(data) {
    const item = data.item;
    const workoutType = item.workoutType;
    let title = '';

    if (workoutType === workoutTypes.CLIMBING) {
        title = item.route.difficulty;
    }
    else {
        title = item.exercise.name;
    }

    return (<Text style={styles.item}>{title}</Text>);
}

const workoutTypes = {
    CLIMBING: 'climbing',
    EXERCISE: 'exercise'
}

const climbTypes = {
    TR: 'top-rope',
    BOULDER: 'bouldering',
    SPORT: 'sport',
    TRAD: 'traditional'
}

const itemsData = [
    {
        title: 'Climbing',
        data: [
            {
                workoutType: workoutTypes.CLIMBING,
                route: {
                    climbType: climbTypes.BOULDER,
                    name: 'The Godfather',
                    difficulty: 'V4',
                    location: {x: 21, y: 43}
                },
                onSite: true,
                attempts: 1,
                completed: true
            },
            {
                workoutType: workoutTypes.CLIMBING,
                route: {
                    climbType: climbTypes.BOULDER,
                    name: 'Geronimo',
                    difficulty: '5.11a',
                    location: undefined
                },
                onSite: false,
                attempts: 3,
                completed: false
            }
        ]
    },
    {
        title: '4x4',
        data: [
            {
                workoutType: workoutTypes.EXERCISE,
                exercise: {
                    name: 'ab-wheel roll out',
                    bodyPart: 'core'
                },
                reps: 0,
                time: 1234838, // milliseconds
                completed: true
            }
        ]
    }
]


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

