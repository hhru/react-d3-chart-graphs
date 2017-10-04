import React from 'react';
import Axis from '../Axis';

const FONT_SIZE_LABEL = 16;
const DEFAULT_PADDING = 5;
const TICKS_COUNT = 4;
const defaultTickFormat = ((value) => (value));

const Axes = ({scales, margins, svgDimensions, legend, padding, ticksCount, tickFormat}) => {
    const {height, width} = svgDimensions;
    const xProps = {
        orient: 'Bottom',
        scale: scales.xScale,
        translate: `translate(0, ${height - margins.bottom})`,
        tickSize: margins.top + margins.bottom - height,
        legend: {
            text: legend.xAxis,
            fontSize: `${FONT_SIZE_LABEL}px`,
            dy: `${margins.bottom - FONT_SIZE_LABEL}px`,
            translate: `translate(${(width - margins.left - margins.right) / 2}px, ${height - margins.bottom}px)`,
        },
        padding: padding && padding.xAxis !== undefined ? padding.xAxis : DEFAULT_PADDING,
        ticksCount: ticksCount && ticksCount.hasOwnProperty('xAxis') ? ticksCount.xAxis : TICKS_COUNT,
        tickFormat: tickFormat && typeof tickFormat.xAxis === 'function' ? tickFormat.xAxis : defaultTickFormat,
    };
    const yProps = {
        orient: 'Left',
        scale: scales.yScale,
        translate: `translate(${margins.left}, 0)`,
        tickSize: margins.left + margins.right - width,
        legend: {
            text: legend.yAxis,
            fontSize: `${FONT_SIZE_LABEL}px`,
            dy: `${FONT_SIZE_LABEL - margins.left}px`,
            translate: `translate(${margins.left}px, ${(height - margins.bottom) / 2}px) rotate(-90deg)`,
        },
        padding: padding && padding.yAxis !== undefined ? padding.yAxis : DEFAULT_PADDING,
        ticksCount: ticksCount && ticksCount.hasOwnProperty('yAxis') ? ticksCount.yAxis : TICKS_COUNT,
        tickFormat: tickFormat && typeof tickFormat.yAxis === 'function' ? tickFormat.yAxis : defaultTickFormat,
    };

    return (
        <g>
            <Axis {...xProps} />
            <Axis {...yProps} />
        </g>
    );
};

export default Axes;
