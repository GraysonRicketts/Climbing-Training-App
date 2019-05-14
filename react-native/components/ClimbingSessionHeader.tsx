import React from 'react';
import { Component } from 'react';
import { 
    Text,
    StyleSheet 
} from 'react-native';


const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666', // TODO: Use project defined color
        backgroundColor: '#F5FCFF' // TODO: Use project defined color
    }
});

interface IClimbingSessionHeaderProps {
    title: string
}

const ClimbingSessionHeader = (props: IClimbingSessionHeaderProps) => {
    const { title } = props;
    
    return (
        <Text style={styles.text}>{title}</Text>
    );
}

export default ClimbingSessionHeader;