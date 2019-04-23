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
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }
        const screenWidth = Dimensions.get('window').width;

        return (
            <View>
                <Text style={styles.header}>{title}</Text>
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