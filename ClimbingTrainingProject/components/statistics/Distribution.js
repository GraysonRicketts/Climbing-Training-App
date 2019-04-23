import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
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
    header: {
        fontSize: 23,
        color: '#666'
    },
});

class Button extends Component {
    render() {
        const { title, data } = this.props;
        if (!data) {
            return null;
        }

        const chartConfig = {
            backgroundGradientFrom: '#FaFAFA',
            backgroundGradientTo: '#FaFAFA',
            color: (_) => '#111',
        }
        const screenWidth = Dimensions.get('window').width * 0.9;

        return (
            <View style={styles.container}>
                {title ? <Text style={styles.header}>{title}</Text> : null }
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