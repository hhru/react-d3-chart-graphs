import React from 'react';
import { BoxPlot } from '@hh.ru/react-d3-chart-graphs';

const items = [
    {
        title: 'First bar',
        numbers: {
            min: 15,
            max: 218,
            median: 30,
            quartiles: [20, 45],
        },
        outliers: [
            {
                key: 'First',
                value: 289,
                title: 'text',
            },
        ],
    },
    {
        title: 'Second Bar',
        numbers: {
            min: 13,
            max: 222,
            median: 70,
            quartiles: [24, 95],
        },
        outliers: [
            {
                key: 'Seсond',
                value: 236,
                title: 'text',
            },
        ],
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
            handleMaxOurlierClick={handleBarClick}
            handleMinOutlierClick={handleBarClick}
            colorScale={colorScale}
            paddingMultiplier={0.5} />
    );
};
