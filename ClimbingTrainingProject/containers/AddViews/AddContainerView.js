/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AddClimbView from './AddClimbView';
import AddExerciseView from './AddExerciseView';


export default class AddContainerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'climb', title: 'Climb' },
                { key: 'generalExercise', title: 'General Exercise' }
            ]
        }
    }

    render() {
        return (
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
                climb: AddClimbView,
                generalExercise: AddExerciseView
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            navigation={this.props.navigation}
          />
        );
      }
}
