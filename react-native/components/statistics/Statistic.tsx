import React, { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppColors from '../../enums/Colors';

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingBottom: 30,
    },
    header: {
        fontSize: 23,
        color: AppColors.gray,
    },
});

interface StatisticProps {
    title: string;
    children: ReactNode;
}

const Statistic = (props: StatisticProps) => {
    const { children, title } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            {children}
        </View>
    );
};

export default Statistic;
