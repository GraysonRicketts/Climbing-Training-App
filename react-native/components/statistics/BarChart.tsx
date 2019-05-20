import { Dimensions } from 'react-native';
import React from 'react';
import AppColors from '../../enums/Colors';
import { ClimbCountsForDifficulty } from '../../util/Climbs';

const ChartKitBarChart = require('react-native-chart-kit').BarChart;

interface ChartKitData {
    labels: string[];
    datasets: [
        {
            data: number[];
        }
    ];
}

interface BarChartProps {
    data: ClimbCountsForDifficulty;
}

/**
 * @description Takes the number of climbs for difficulties in a single type of climbing
 * and parses it for the ChartKitBarChart component
 * @param climbData - Number of climbs for different difficulties.
 */
function formatDataForGraph(climbData: ClimbCountsForDifficulty): ChartKitData {
    const data: ChartKitData = {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    };

    Object.keys(climbData).forEach((grade) => {
        if (climbData[grade]) {
            data.labels.push(grade);
            data.datasets[0].data.push(climbData[grade]);
        }
    });

    return data;
}

const BarChart = (props: BarChartProps) => {
    const { data } = props;
    const formattedData = formatDataForGraph(data);

    const chartConfig = {
        background: AppColors.white,
        backgroundGradientFrom: AppColors.white,
        backgroundGradientTo: AppColors.white,
        color: () => AppColors.black,
    };
    const screenWidth = Dimensions.get('window').width * 0.9;

    return (
        <ChartKitBarChart
            chartConfig={chartConfig}
            data={formattedData}
            fromZero
            height={220}
            width={screenWidth}
        />
    );
};

export default BarChart;
