import React from 'react';
import { Button } from 'react-native';

interface ISaveSessionButtonProps {
    title: string
    navigation: any
    navigationParam: any
    isCancel?: boolean
}

const SaveSessionButton = (props: ISaveSessionButtonProps) => {
    const { 
        title, 
        navigation, 
        navigationParam, 
        isCancel 
    } = props;

    return (
        <Button
            title={title}
            onPress={navigation.getParam(navigationParam)}
            color={isCancel ? '#FF4C4C' : undefined } // TODO: Use project defined color
        />
    );
}

export default SaveSessionButton;