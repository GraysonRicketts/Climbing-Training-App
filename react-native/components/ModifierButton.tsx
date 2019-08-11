import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';
import { ClimbModifier } from '../util/Climbs';
import Button from './Button';
import AppColors from '../enums/Colors';

interface SaveSessionButtonProps {
    image: ImageSourcePropType;
    modifier: ClimbModifier;
    modifierClicked: Function;
    isSelected?: boolean;
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        flex: 1,
        margin: 10,
    },
    icon: {
        height: 30,
        width: 30,
    },
    selected: {
        backgroundColor: AppColors.saveGreen,
    },
});

function getModifierName(modifier: ClimbModifier): string {
    switch (modifier) {
        case ClimbModifier.warmUp:
            return 'Warm-up';
        case ClimbModifier.redPoint:
            return 'Redpoint';
        case ClimbModifier.flash:
            return 'Flash';
        case ClimbModifier.onSite:
            return 'Onsite';
        default:
            return 'Failed';
    }
}

const ModifierButton = (props: SaveSessionButtonProps) => {
    const {
        modifierClicked,
        modifier,
        image,
        isSelected,
    } = props;

    const title = getModifierName(modifier);

    return (
        <Button
            fontSize={20}
            onPress={modifierClicked}
            style={isSelected ? {
                ...styles.selected,
                ...styles.container,
            } : styles.container}
            title={title}
        >
            <Image
                source={image}
                style={styles.icon}
            />
        </Button>
    );
};

export default ModifierButton;
