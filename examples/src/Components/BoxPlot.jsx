import React from 'react';
import {BoxPlot} from '@hh.ru/react-d3-chart-graphs';

const items = [
    {
        title: 'First bar',
        values: {
            min: 15,
            max: 118,
            median: 30,
            quartiles: {
                min: 20,
                max: 45,
            },
            ejection: {
                min: 3,
                max: 290,
            },
        },
    },
    {
        title: 'Second Bar',
        values: {
            min: 13,
            max: 222,
            median: 70,
            quartiles: {
                min: 24,
                max: 95,
            },
            ejection: {
                min: 1,
                max: 250,
            },
        },
    },
];

const colorScale = {
    min: '#B2EBF2',
    max: '#CCC',
};

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
};

export default () => {
    const handleBarHover = (item) => {
        console.log('hovered', item);
    };

    const handleBarClick = (item) => {
        console.log('clicked', item);
    };

    return (
        <BoxPlot
            axesProps={axesProps}
            data={items}
            handleBarHover={handleBarHover}
            handleBarClick={handleBarClick}
            colorScale={colorScale}
            paddingMultiplier={0.5} />
    );
};
