import React from 'react';
import PropTypes from 'prop-types';

import Bar from 'components/Bar';

const StackedBar = ({ scales, margins, data, svgDimensions, stackColors, isClickable }) => {
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;
    const keyPrefix = data.key || data.titleBar;

    let previsionHeight = 0;
    const bars = data.values.map((datum) => {
        const itemHeight = height - margins.bottom - scales.yScale(datum.value);
        previsionHeight += datum.value;
        return (
            <Bar
                datum={datum}
                key={keyPrefix + datum.title}
                titleBar={data.titleBar}
                x={xScale(data.index)}
                y={yScale(previsionHeight)}
                width={xScale.bandwidth()}
                height={itemHeight}
                fill={stackColors[datum.title].color}
                isClickable={isClickable}
            />
        );
    });

    return <g>{bars}</g>;
};

StackedBar.propTypes = {
    scales: PropTypes.object,
    margins: PropTypes.object,
    data: PropTypes.object,
    svgDimensions: PropTypes.object,
    stackColors: PropTypes.object,
    isClickable: PropTypes.bool,
};

export default StackedBar;
