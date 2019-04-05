import React from 'react';
import PropTypes from 'prop-types';

import StackedBar from 'components/StackedBar';

const StackedBars = ({ scales, margins, data, svgDimensions, maxValue, stackColors, isClickable }) => (
    <g>
        {data.map((datum) => (
            <StackedBar
                scales={scales}
                key={datum.key || datum.titleBar}
                isClickable={isClickable}
                margins={margins}
                data={datum}
                stackColors={stackColors}
                maxValue={maxValue}
                svgDimensions={svgDimensions}
            />
        ))}
    </g>
);

StackedBars.propTypes = {
    scales: PropTypes.object,
    margins: PropTypes.object,
    data: PropTypes.array,
    svgDimensions: PropTypes.object,
    maxValue: PropTypes.number,
    stackColors: PropTypes.array,
    isClickable: PropTypes.bool,
};

export default StackedBars;
