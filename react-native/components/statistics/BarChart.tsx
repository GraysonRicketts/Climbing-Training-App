import React from 'react';
import { Component } from 'react';
import {
    Dimensions
} from 'react-native';
const ChartKitBarChart = require('react-native-chart-kit').BarChart;

interface ChartKitData {
  labels: string[],
  datasets: [{
    data: number[]
  }]
}

interface IBarChartProps {
  data: any
}

class BarChart extends Component<IBarChartProps> {
    render() {
        const { data } = this.props;
        const formattedData = this._formatDataForGraph(data);

        const chartConfig = {
            background: '#F5FCFF', // TODO: use project defined color
            backgroundGradientFrom: '#F5FCFF',
            backgroundGradientTo: '#F5FCFF',
            color: '#111'
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

    _formatDataForGraph(climbData: any) {
        let data: ChartKitData = {
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