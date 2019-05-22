import React from 'react';
import {
    NavigationScreenProp,
    NavigationRoute,
    NavigationParams,
} from 'react-navigation';
import { Button } from 'react-native';
import AppColors from '../enums/Colors';

interface SaveSessionButtonProps {
    title: string;
    navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
    navigationParam: string;
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
