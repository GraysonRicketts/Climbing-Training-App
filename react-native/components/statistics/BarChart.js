import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import {
    BarChart as ChartKitBarChart,
} from 'react-native-chart-kit';

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingBottom: 30
    },
});

class BarChart extends Component {
    render() {
        const { data } = this.props;
        const formattedData = this._formatDataForGraph(data);

        const chartConfig = {
            backgroundGradientFrom: '#FaFAFA',
            backgroundGradientTo: '#FaFAFA',
            color: (_) => '#111',
        }
        const screenWidth = Dimensions.get('window').width * 0.9;

        return (
            <View style={styles.container}>
                <ChartKitBarChart 
                    data={formattedData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>
        )
    }

    _formatDataForGraph(climbData) {
        let data = {
          labels: [],
          datasets: [{
            data: []
          }]
        };
    
        Object.keys(climbData).forEach((grade) => {
          if (climbData[grade]) {
            data.labels.push(grade);
            data.datasets[0].data.push(climbData[grade]);
          }
        });
    
        return data;
      }
}



export default BarChart;