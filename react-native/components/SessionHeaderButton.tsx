import React from 'react';
import { Button } from 'react-native';
import AppColors from '../enums/Colors';
import { NavigationScreenProp } from 'react-navigation';

interface SaveSessionButtonProps {
    title: string;
    navigation: NavigationScreenProp;
    navigationParam: any;
    isCancel?: boolean;
}

const SaveSessionButton = (props: SaveSessionButtonProps) => {
    const {
        title,
        navigation,
        navigationParam,
        isCancel,
    } = props;

    return (
        <Button
            color={isCancel ? AppColors.errorRed : undefined}
            onPress={navigation.getParam(navigationParam)}
            title={title}
        />
    );
};

export default SaveSessionButton;
