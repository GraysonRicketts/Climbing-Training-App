/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, FlatList, Button, Text, View, TextInput} from 'react-native';


export default class AddExerciseView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            type: climbTypes.BOULDER
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Add climb on this screen</Text>

            <TextInput
                style={styles.exerciseSearch}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />

            <FlatList
                data={[{key: 'V4'}, {key: 'V1'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
                ListHeaderComponent={exerciseListHeader}
            />

            <Button
                onPress={saveExercise.bind(this, this.props.navigation)}
                title={'Save'}
            ></Button>
          </View>
        );
      }
}

function saveExercise(navigation) {
    // TODO: Save what the user has entered / selected

    navigation.goBack();
}

const exerciseListHeader = () => {
    return (<Text
        title='General exercises'
        style={styles.sectionHeader}
    ></Text>)
}

const climbTypes = {
    TR: 'top-rope',
    BOULDER: 'bouldering',
    SPORT: 'sport',
    TRAD: 'traditional'
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      flexDirection: 'column',
      backgroundColor: '#F5FCFF',
      paddingBottom: '5%'
    },
    header: {
        flexGrow: 1,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    sectionHeader: {
        margin: 10,
        backgroundColor: '#cccccc'
    }
  });