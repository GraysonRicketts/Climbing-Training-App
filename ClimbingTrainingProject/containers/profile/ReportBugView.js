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
  Linking
} from 'react-native';
import qs from 'qs';
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

  // TODO: if no connection save bug until user connects again
  render() {
    return (
      <View style={styles.container}>
        <SubmissionForm 
          onButtonPress={this.sendEmail.bind(this)}
        />
      </View>
    );
  }

  async sendEmail(subject, body) {
    const to = 'grayson.ricketts@gmail.com';
    let title = `Climbing training app bug: ${subject}`;

    // TODO: use sendPulse or mailGun with Post instead of `mailto:`

  }

  static navigationOptions(navigationState) {
    return {
      title: '‍‍Report a Bug',
    }
  }
}

export default ReportBug;