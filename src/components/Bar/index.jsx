import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({ x, y, width, height, datum, fill, fillOpacity, titleBar, isClickable }) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={fillOpacity}
        style={isClickable ? { cursor: 'pointer' } : {}}
        data-type="bar"
        data-datum={JSON.stringify({
            ...datum,
            titleBar,
            metrics: {
                left: x,
                top: y,
                width,
            },
        })}
    />
);

Bar.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    datum: PropTypes.object,
    fill: PropTypes.string,
    fillOpacity: PropTypes.number,
    titleBar: PropTypes.string,
    isClickable: PropTypes.bool,
};

export default Bar;
