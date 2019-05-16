import React from 'react';

import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import AppColors from '../enums/Colors';

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
    sentText: {
        fontSize: ROW_FONT_SIZE,
    },
});

interface ClimbDataRowProps {
    difficulty: string;
    sentIt: boolean;
    onPress?: Function;
    isSelected?: boolean;
    climbKey?: number;
}

const ClimbDataRow = (props: ClimbDataRowProps) => {
    const {
        difficulty,
        sentIt,
        isSelected,
        onPress,
        climbKey,
    } = props;

    return (
        <TouchableHighlight
            activeOpacity={0.5}
            onPress={onPress ? _ => onPress(climbKey, _) : () => {}}
            style={isSelected ? { backgroundColor: AppColors.highlightBlue } : undefined}
            underlayColor={AppColors.white}
        >
            <View
            // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    ...styles.container,
                    opacity: sentIt ? 1 : 0.25,
                }}
            >
                <Text style={styles.difficultyText}>
                    {difficulty}
                </Text>
                <Text style={styles.sentText}>
                    {sentIt ? '✔️' : '❌'}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

export default ClimbDataRow;
