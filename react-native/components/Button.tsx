import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10
  },
});

interface IButtonProps {
  title: string,
  onPress: Function,
  fontSize: number
  fontColor?: string,
  style?: ViewStyle
  isEmphasized?: boolean,
}

class Button extends Component<IButtonProps> {
 render() {
    const { 
      title,
      onPress,
      fontSize,
      fontColor,
      isEmphasized,
      style,
      children
    } = this.props;

   return (
        <TouchableOpacity
            style={{ ...styles.button, ...style }}
            onPress={(_) => onPress()}
        >
          {children}
          <Text
            style={{
                fontSize,
                color: fontColor,
                fontWeight: isEmphasized ? 'bold' : 'normal'
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
    );
  }
}

export default Button;