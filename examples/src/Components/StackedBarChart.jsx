import React from 'react';

import {StackedBarChart} from '@hh.ru/react-d3-chart-graphs';

const data = [
    {
        "title": "first bar",
        "values": [
            {
                "title": "BAR_1",
                "value": 5
            },
            {
                "title": "BAR_2",
                "value": 7
            },
            {
                "title": "BAR_3",
                "value": 5
            },
            {
                "title": "BAR_4",
                "value": 10
            },
            {
                "title": "BAR_5",
                "value": 20
            },
            {
                "title": "BAR_6",
                "value": 5
            },
            {
                "title": "BAR_7",
                "value": 9
            },
            {
                "title": "BAR_8",
                "value": 12
            },
            {
                "title": "BAR_9",
                "value": 4
            }
        ]
    },
    {
        "title": "second bar",
        "values": [
            {
                "title": "BAR_1",
                "value": 2
            },
            {
                "title": "BAR_2",
                "value": 10
            },
            {
                "title": "BAR_3",
                "value": 3
            },
            {
                "title": "BAR_4",
                "value": 4
            },
            {
                "title": "BAR_5",
                "value": 12
            },
            {
                "title": "BAR_6",
                "value": 7
            },
            {
                "title": "BAR_7",
                "value": 6
            },
            {
                "title": "BAR_8",
                "value": 3
            },
            {
                "title": "BAR_9",
                "value": 5
            }
        ]
    },
    {
        "title": "third bar",
        "values": [
            {
                "title": "BAR_1",
                "value": 10
            },
            {
                "title": "BAR_2",
                "value": 10
            },
            {
                "title": "BAR_3",
                "value": 5
            },
            {
                "title": "BAR_4",
                "value": 3
            },
            {
                "title": "BAR_5",
                "value": 6
            },
            {
                "title": "BAR_6",
                "value": 8
            },
            {
                "title": "BAR_7",
                "value": 3
            },
            {
                "title": "BAR_8",
                "value": 4
            },
            {
                "title": "BAR_9",
                "value": 11
            }
        ]
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
    'BAR_1': '#607D8B',
    'BAR_2': '#4CAF50',
    'BAR_3': '#009688',
    'BAR_4': '#00BCD4',
    'BAR_5': '#2196F3',
    'BAR_6': '#3F51B5',
    'BAR_7': '#FFCCBC',
    'BAR_8': '#FF9800',
    'BAR_9': '#FFEB3B',
};

export default () => {
    const handleBarHover = (item) => {
        console.log('hovered', item);
    };

    const handleBarClick = (item) => {
        console.log('clicked', item);
    };

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
