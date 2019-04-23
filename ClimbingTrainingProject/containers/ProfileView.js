/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Button from './../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center'
  },
  explanatoryText: {
    marginTop: 15,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
    color: '#222',
    position: 'absolute',
    bottom: 20
  },
  linkButton: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#020202',
    padding: 20,
    marginBottom: -1,
    alignItems: 'flex-start'
  },
});

class ProfileView extends Component {
  constructor(props) {
      super(props);
  }

  // TODO: profile (screen)
    // TODO: linked account / login info
    // TODO: payment info
  render() {
    return (
      <View style={styles.container}>
        <Button
          title='Settings'
          onPress={this._pushSettingsView.bind(this)}
          style={styles.linkButton}
          fontSize={18}
          fontColor={'#5396FC'}
        />

        <Button
          title='Send a suggestion'
          onPress={this._pushSuggestionView.bind(this)}
          style={styles.linkButton}
          fontSize={18}
          fontColor={'#5396FC'}
        />
        
        <Button
          title='Report a bug'
          onPress={this._pushReportBugView.bind(this)}
          style={styles.linkButton}
          fontSize={20}
          fontColor={'#FE5042'}
        />

        <Text style={styles.explanatoryText}>
          *Customizable profiles to come in future release
        </Text>
      </View>
    );
  }
  
  _pushReportBugView() {
    this.props.navigation.push('ReportBug');
  }

  _pushSettingsView() {
    this.props.navigation.push('Settings');
  }

  _pushSuggestionView() {
    this.props.navigation.push('SendSuggestion');
  }

  static navigationOptions(navigationState) {
    return {
      title: '‍‍Profile',
    }
  }
}

export default ProfileView;