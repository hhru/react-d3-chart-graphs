import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bar from 'src/Bar';

export default class Bars extends Component {
    static propTypes = {
        scales: PropTypes.shape({
            xScale: PropTypes.func,
            yScale: PropTypes.func,
        }),
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        data: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                value: PropTypes.number,
            })
        ),
        svgDimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        maxValue: PropTypes.number,
        stackColors: PropTypes.object,
        isClickable: PropTypes.bool,
        colorScale: PropTypes.func,
    };
    render() {
        const { scales, margins, data, svgDimensions, isClickable, colorScale } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        const bars = data.map((datum) => (
            <Bar
                key={datum.title}
                x={xScale(datum.title)}
                y={yScale(datum.value)}
                datum={datum}
                isClickable={isClickable}
                height={height - margins.bottom - scales.yScale(datum.value)}
                width={xScale.bandwidth()}
                fill={colorScale(datum.value)}
            />
        ));

        return <g>{bars}</g>;
    }
}
