import React from 'react';

import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
} from 'react-native';
import AppColors from '../enums/Colors';
import { ClimbModifier } from '../util/Climbs';
import Images from '../assets/Images';

const ROW_FONT_SIZE = 30;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 25,
        paddingBottom: 25,
        borderColor: AppColors.gray,
        borderRadius: 0,
        borderBottomWidth: 0.5,
    },
    difficultyText: {
        fontSize: ROW_FONT_SIZE,
        flexGrow: 2,
    },
    modifierIcon: {
        height: 30,
        width: 30,
        margin: 10,
    },
});

function getModifierImage(modifier: ClimbModifier): ImageSourcePropType | undefined {
    switch (modifier) {
        case ClimbModifier.redPoint:
            return Images.redPoint;
        case ClimbModifier.flash:
            return Images.flash;
        case ClimbModifier.onSite:
            return Images.onSite;
        case ClimbModifier.warmUp:
            return Images.warmUp;
        default:
            return undefined;
    }
}
interface ClimbDataRowProps {
    difficulty: string;
    modifier: ClimbModifier;
    onPress?: Function;
    isSelected?: boolean;
    climbKey?: number;
}

const ClimbDataRow = (props: ClimbDataRowProps) => {
    const {
        difficulty,
        modifier,
        isSelected,
        onPress,
        climbKey,
    } = props;

    const modifierImage = getModifierImage(modifier);

    return (
        <TouchableHighlight
            activeOpacity={0.5}
            onPress={onPress ? _ => onPress(climbKey, _) : () => {}}
            style={isSelected ? { backgroundColor: AppColors.highlightBlue } : undefined}
            underlayColor={AppColors.white}
        >
            <View
                style={styles.container}
            >
                <Text style={styles.difficultyText}>
                    {difficulty}
                </Text>

                {modifierImage ? (
                    <Image
                        source={modifierImage}
                        style={styles.modifierIcon}
                    />
                ) : undefined }
            </View>
        </TouchableHighlight>
    );
};

export default ClimbDataRow;
