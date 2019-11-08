import React from 'react';

// import {StackedBarChart} from '@hh.ru/react-d3-chart-graphs';
import {StackedBarChart} from  '../dist/index.js';

const data = [
    {
        titleBar: 'first bar',
        values: [
            {
                title: 'BAR_1',
                value: 5,
            },
            {
                title: 'BAR_2',
                value: 7,
            },
            {
                title: 'BAR_3',
                value: 5,
            },
            {
                title: 'BAR_4',
                value: 10,
            },
            {
                title: 'BAR_5',
                value: 20,
            },
            {
                title: 'BAR_6',
                value: 5,
            },
            {
                title: 'BAR_7',
                value: 9,
            },
            {
                title: 'BAR_8',
                value: 12,
            },
            {
                title: 'BAR_9',
                value: 4,
            }
        ]
    },
    {
        titleBar: 'second bar',
        values: [
            {
                title: 'BAR_1',
                value: 2,
            },
            {
                title: 'BAR_2',
                value: 10,
            },
            {
                title: 'BAR_3',
                value: 3,
            },
            {
                title: 'BAR_4',
                value: 4,
            },
            {
                title: 'BAR_5',
                value: 12,
            },
            {
                title: 'BAR_6',
                value: 7,
            },
            {
                title: 'BAR_7',
                value: 6,
            },
            {
                title: 'BAR_8',
                value: 3,
            },
            {
                title: 'BAR_9',
                value: 5,
            }
        ]
    },
    {
        titleBar: 'third bar',
        values: [
            {
                title: 'BAR_1',
                value: 10,
            },
            {
                title: 'BAR_2',
                value: 10,
            },
            {
                title: 'BAR_3',
                value: 5,
            },
            {
                title: 'BAR_4',
                value: 3,
            },
            {
                title: 'BAR_5',
                value: 6,
            },
            {
                title: 'BAR_6',
                value: 8,
            },
            {
                title: 'BAR_7',
                value: 3,
            },
            {
                title: 'BAR_8',
                value: 4,
            },
            {
                title: 'BAR_9',
                value: 11,
            },
        ],
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
};

const stackColors = {
    BAR_1: {
        color: '#607D8B',
        legend: 'some bar 1',
    },
    BAR_2: {
        color: '#4CAF50',
        legend: 'some bar 2',
    },
    BAR_3: {
        color: '#009688',
        legend: 'some bar 3',
    },
    BAR_4: {
        color: '#00BCD4',
        legend: 'some bar 4',
    },
    BAR_5: {
        color: '#2196F3',
        legend: 'some bar 5',
    },
    BAR_6: {
        color: '#3F51B5',
        legend: 'some bar 6',
    },
    BAR_7: {
        color: '#FFCCBC',
        legend: 'some bar 7',
    },
    BAR_8: {
        color: '#FF9800',
        legend: 'some bar 8',
    },
    BAR_9: {
        color: '#FFEB3B',
        legend: 'some bar 9',
    },
};

export default () => {
    const handleBarHover = (item) => {
        console.log('hovered', item);
    };

    const handleBarClick = (item) => {
        console.log('clicked', item);
    };
    
    console.log(axesProps)

    return (
        <div>
            <StackedBarChart
                axesProps={axesProps}
                data={data}
                handleBarHover={handleBarHover}
                handleBarClick={handleBarClick}
                stackColors={stackColors}
                paddingMultiplier={0.8} />
        </div>
    )
};
