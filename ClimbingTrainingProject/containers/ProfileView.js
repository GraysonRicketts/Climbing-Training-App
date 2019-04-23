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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  explanatoryText: {
    marginTop: 15,
    fontSize: 18,
    color: '#222'
  },
  navigationButton: {
    backgroundColor: '#7ED7D7',
    margin: 50,
    padding: 20
  }
});

class ProfileView extends Component {
    constructor(props) {
        super(props);
    }

    // TODO: settings zone (screen)
      // TODO: default grade
      // TODO: hide grades
      // TODO: what fields show up when adding climb
        // TODO: tags
        // TODO: sent it?
        // TODO: onsite
        // TODO: num attempts
    // TODO: bug report (screen)
    // TODO: suggestion field (screen)
    // TODO: profile (screen)
      // TODO: linked account / login info
      // TODO: payment info
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.explanatoryText}>Customizable profiles to come in future release</Text>

            <Button
              title='App settings'
              style={styles.navigationButton}
              fontSize={30}
              fontColor={'#020202'}
            />

            <Button
              title='Report a bug'
              style={styles.navigationButton}
              fontSize={30}
              fontColor={'#020202'}
            />

            <Button
              title='Send a suggestion'
              style={styles.navigationButton}
              fontSize={30}
              fontColor={'#020202'}
            />
          </View>
        );
      }
}

export default ProfileView;