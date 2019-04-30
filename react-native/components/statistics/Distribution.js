import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import {
    BarChart,
} from 'react-native-chart-kit';

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingBottom: 30
    },
});

class Button extends Component {
    render() {
        const { data } = this.props;

        const chartConfig = {
            backgroundGradientFrom: '#FaFAFA',
            backgroundGradientTo: '#FaFAFA',
            color: (_) => '#111',
        }
        const screenWidth = Dimensions.get('window').width * 0.9;

        return (
            <View style={styles.container}>
                <BarChart 
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>
        )
    }
}



export default Button;