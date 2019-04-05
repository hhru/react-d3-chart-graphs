import React from 'react';
import PropTypes from 'prop-types';

import Bar from 'components/Bar';

const Bars = ({ scales, margins, data, svgDimensions, isClickable, colorScale }) => {
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;

    return (
        <g>
            {data.map((datum) => (
                <Bar
                    key={datum.title}
                    datum={datum}
                    x={xScale(datum.title)}
                    y={yScale(datum.value)}
                    width={xScale.bandwidth()}
                    height={height - margins.bottom - scales.yScale(datum.value)}
                    fill={colorScale(datum.value)}
                    isClickable={isClickable}
                />
            ))}
        </g>
    );
};

Bars.propTypes = {
    scales: PropTypes.object,
    margins: PropTypes.object,
    data: PropTypes.array,
    svgDimensions: PropTypes.object,
    isClickable: PropTypes.bool,
    colorScale: PropTypes.array,
};

export default Bars;
