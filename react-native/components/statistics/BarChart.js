import React, { Component } from 'react';
import {
    Dimensions
} from 'react-native';
import {
    BarChart as ChartKitBarChart,
} from 'react-native-chart-kit';
import CLIMBING_TYPES from './../../enums/ClimbingTypes';

class BarChart extends Component {
    render() {
        const { data } = this.props;
        const formattedData = this._formatDataForGraph(data);

        const chartConfig = {
            background: '#F5FCFF', // Opaque
            backgroundGradientFrom: '#F5FCFF',
            backgroundGradientTo: '#F5FCFF',
            color: (_) => '#111'
        }
        const screenWidth = Dimensions.get('window').width * 0.9;

        return (
            <ChartKitBarChart 
                data={formattedData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                fromZero={true}
            />
        )
    }

    _formatDataForGraph(climbData) {
        let data = {
          labels: [],
          datasets: [{
            data: []
          }]
        };
    
        let dataExists = false;
        Object.keys(climbData).forEach((grade) => {
          if (climbData[grade]) {
            dataExists = true;

            data.labels.push(grade);
            data.datasets[0].data.push(climbData[grade]);
          }
        });

        if (!dataExists) {
            return null;
        }
    
        return data;
      }
}

export default BarChart;