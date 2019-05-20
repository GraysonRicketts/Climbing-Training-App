import React, { Component, ReactNode } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
    },
});

interface ButtonProps {
    title: string;
    onPress: Function;
    fontSize: number;
    fontColor?: string;
    style?: ViewStyle;
    isEmphasized?: boolean;
    children?: ReactNode | Component | Element;
}

const Button = (props: ButtonProps) => {
    const {
        title,
        onPress,
        fontSize,
        fontColor,
        isEmphasized,
        style,
        children,
    } = props;

    return (
        <TouchableOpacity
            onPress={_ => onPress(_)}
            style={{ ...styles.button, ...style }}
        >
            {children}
            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    fontSize,
                    color: fontColor,
                    fontWeight: isEmphasized ? 'bold' : 'normal',
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
