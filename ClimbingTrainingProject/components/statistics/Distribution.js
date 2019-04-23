import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        color: '#444'
    },
    statistic: {
        alignItems: 'center',
        padding: 10
    },
});

class Button extends Component {
 render() {
    const { title, statistic } = this.props;
   return (
        <View>
            <Text style={styles.header}>{title}</Text>
            <Text style={style.statistic}>{statistic}</Text>
        </View>
    )
  }
}



export default Button;