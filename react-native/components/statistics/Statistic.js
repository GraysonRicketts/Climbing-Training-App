import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingBottom: 30
    },
    header: {
        fontSize: 23,
        color: '#666'
    },
});

class Statistic extends Component {
 render() {
    const { children, title } = this.props;

   return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            {children}
        </View>
    )
  }
}



export default Statistic;