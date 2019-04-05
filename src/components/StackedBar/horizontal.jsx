import React from 'react';
import PropTypes from 'prop-types';

import Bar from 'components/Bar';

const DEFAULT_COLOR = '#37474F';

const StackedBarHorizontal = ({ scales, data, stackColors, isClickable, fillOpacity, height, y }) => {
    const { xScale } = scales;
    const bars = data.values.map((datum) => {
        const dateInitial = new Date(datum.dateStart);
        const x = xScale(dateInitial);
        const width = xScale(new Date(datum.dateEnd)) - x;

        return (
            <Bar
                key={datum.title + dateInitial.getTime()}
                x={x}
                y={y}
                titleBar={data.titleBar}
                datum={datum}
                isClickable={isClickable}
                height={height}
                width={width}
                fillOpacity={fillOpacity}
                fill={(stackColors[datum.title] && stackColors[datum.title].color) || DEFAULT_COLOR}
            />
        );
    });

    return <g>{bars}</g>;
};

StackedBarHorizontal.propTypes = {
    scales: PropTypes.object,
    data: PropTypes.array,
    stackColors: PropTypes.array,
    isClickable: PropTypes.bool,
    fillOpacity: PropTypes.number,
    height: PropTypes.number,
    y: PropTypes.number,
};

export default StackedBarHorizontal;
