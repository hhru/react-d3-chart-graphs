import React from 'react';
// import {GanttChart} from '@hh.ru/react-d3-chart-graphs';
import {GanttChart} from '../dist/index.js';
import {timeFormat} from 'd3-time-format';

const data = [
    {
        titleBar: 'BAR-1',
        values: [
            {
                title: 'status-1',
                dateStart: 'Fri, 14 Apr 2017 18:16:05 GMT',
                dateEnd: 'Tue, 18 Apr 2017 19:10:06 GMT',
            },
            {
                title: 'status-2',
                dateStart: 'Tue, 18 Apr 2017 19:10:06 GMT',
                dateEnd: 'Tue, 19 Apr 2017 12:10:06 GMT',
            },
        ],
    },
    {
        titleBar: 'BAR-2',
        values: [
            {
                title: 'status-1',
                dateStart: 'Fri, 10 Apr 2017 18:16:05 GMT',
                dateEnd: 'Tue, 12 Apr 2017 19:10:06 GMT',
            },
            {
                title: 'status-2',
                dateStart: 'Tue, 12 Apr 2017 19:10:06 GMT',
                dateEnd: 'Tue, 22 Apr 2017 12:10:06 GMT',
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
        xAxis: 5,
        yAxis: 5,
    },
    tickFormat: {
        // xAxis: timeFormat('%d %B %y'),
        xAxis: timeFormat('%-I:%M:%S %p')
    },
    ticksCount: {
        xAxis: 50
    }
};

const stackColors = {
    'status-1': {
        color: '#607D8B',
        legend: 'status first',
    },
    'status-2': {
        color: '#EF5350',
        legend: 'status second',
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
        <GanttChart
            manualAxes={true}
            axesProps={axesProps}
            data={data}
            handleBarHover={handleBarHover}
            handleBarClick={handleBarClick}
            paddingMultiplier={0.6}
            stackColors={stackColors} />
    );
};
