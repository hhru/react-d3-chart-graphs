import React from 'react';
import { BarChart } from '@hh.ru/react-d3-chart-graphs';
import wtf from '@hh.ru/react-d3-chart-graphs';

const items = [
    {
        title: 'First bar',
        value: 2,
    },
    {
        title: 'Second bar',
        value: 4,
    },
    {
        title: 'Third bar',
        value: 5,
    },
    {
        title: 'Last bar',
        value: 7,
    },
];

const axesProps = {
    legend: {
        xAxis: 'Label bottom axis',
        yAxis: 'Label left axis',
    },
    padding: {
        xAxis: 20,
        yAxis: 20,
    },
    ticksCount: 6,
    tickFormat: {
        xAxis: function(value) {
            return `${value} - formated`;
        },
    },
};

const colorScale = {
    min: '#B2EBF2',
    max: '#CCC',
};

export default () => {
    const handleBarHover = (item) => {
        console.log('hovered', item);
    };

    const handleBarClick = (item) => {
        console.log('clicked', item);
    };

    return (
        <BarChart
            axesProps={axesProps}
            data={items}
            colorScale={colorScale}
            handleBarHover={handleBarHover}
            handleBarClick={handleBarClick}
            paddingMultiplier={0.24} />
    );
};

