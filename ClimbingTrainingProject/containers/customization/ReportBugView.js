/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { 
  StyleSheet, 
  View, 
} from 'react-native';
import SubmissionForm from '../../components/SubmissionForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15
  }
});

class ReportBug extends Component {
  constructor(props) {
      super(props);
  }

  // TODO: bug report (screen)
  render() {
    return (
      <View style={styles.container}>
        <SubmissionForm 
          onButtonPress={()=>{}}
        />
      </View>
    );
  }

  static navigationOptions(navigationState) {
    return {
      title: '‍‍Report a Bug',
    }
  }
}

export default ReportBug;