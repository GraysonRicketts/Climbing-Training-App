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

interface ISendSuggestionProps {
  navigation: any
}

class SendSuggestion extends Component<ISendSuggestionProps> {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SubmissionForm 
          templateId={TEMPLATE_ID.suggestion}
          goBack={navigation.goBack.bind(this)}
        />
      </View>
    );
  }

  static navigationOptions() {
    return {
      title: '‍‍Suggestion',
    }
  }
}

export default SendSuggestion;