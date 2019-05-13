import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import SubmissionForm from '../../components/SubmissionForm';
import { TEMPLATE_ID } from '../../util/EmailSender';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15
  }
});

interface IReportBugProps {
  navigation: any // TODO: typecheck
}

class ReportBug extends Component<IReportBugProps> { 

  // TODO: if no connection save bug until user connects again
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SubmissionForm 
          templateId={TEMPLATE_ID.bug}
          goBack={navigation.goBack.bind(this)}
        />
      </View>
    );
  }

  static navigationOptions() {
    return {
      title: '‍‍Report a Bug',
    }
  }
}

export default ReportBug;