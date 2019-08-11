import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import AppColors from '../enums/Colors';


const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: AppColors.gray,
        backgroundColor: AppColors.white,
    },
});

interface ClimbingSessionHeaderProps {
    title: string;
}

const ClimbingSessionHeader = (props: ClimbingSessionHeaderProps) => {
    const { title } = props;

    return (
        <Text style={styles.text}>{title}</Text>
    );
};

export default ClimbingSessionHeader;
