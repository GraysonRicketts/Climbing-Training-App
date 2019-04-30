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
import { TEMPLATE_ID } from './../../helpers/EmailSender';

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
          templateId={TEMPLATE_ID.bug}
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