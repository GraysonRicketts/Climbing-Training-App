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
    statistic: {
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 30,
        paddingTop: 10,
        color: '#111'
    },
});

class AverageNumber extends Component {
 render() {
    const { title, statistic } = this.props;
   return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.statistic}>{statistic}</Text>
        </View>
    )
  }
}



export default AverageNumber;