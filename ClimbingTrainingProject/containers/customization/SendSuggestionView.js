/**
 * TODO
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

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
    borderWidth: 1,
    borderColor: '#020202',
    padding: 20,
    marginBottom: -1,
    alignItems: 'flex-start'
  },
});

class SendSuggestion extends Component {
    constructor(props) {
        super(props);
    }

    // TODO: suggestion field (screen)
    render() {
        return (
          <View style={styles.container}>

            <Text style={styles.explanatoryText}>
              *Send suggestion to come in future release
            </Text>
          </View>
        );
      }
}

export default SendSuggestion;