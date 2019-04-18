import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      padding: 10
    },
  });

class Button extends Component {
 render() {
    const { title, onPress, fontSize, fontColor, style } = this.props;

   return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...style
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontSize,
                    color: fontColor
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
  }
}



export default Button;