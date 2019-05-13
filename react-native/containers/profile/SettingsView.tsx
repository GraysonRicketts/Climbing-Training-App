import React from 'react';
import { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';

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

class Settings extends Component {
    // TODO: settings zone (screen)
      // TODO: default grade
      // TODO: hide grades
      // TODO: what fields show up when adding climb
        // TODO: tags
        // TODO: sent it?
        // TODO: onsite
        // TODO: num attempts
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.explanatoryText}>
          *Customization to come in future release
        </Text>
      </View>
    );
  }

  static navigationOptions() {
    return {
      title: '‍‍Settings',
    }
  }
}

export default Settings;