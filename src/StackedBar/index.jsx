import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bar from 'src/Bar';

export default class StackedBar extends Component {
    static propTypes = {
        stackColors: PropTypes.object,
        isClickable: PropTypes.bool,
        data: PropTypes.object,
        svgDimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        parentWidth: PropTypes.number,
        scales: PropTypes.shape({
            xScale: PropTypes.func,
            yScale: PropTypes.func,
        }),
    };

    render() {
        const { scales, margins, data, svgDimensions, stackColors, isClickable } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;
        let previsionHeight = 0;

        const bars = data.values.map((datum) => {
            const itemHeight = height - margins.bottom - scales.yScale(datum.value);
            previsionHeight += datum.value;

            return (
                <Bar
                    titleBar={data.titleBar}
                    key={(data.key || data.titleBar) + datum.title}
                    isClickable={isClickable}
                    datum={datum}
                    x={xScale(data.index)}
                    y={yScale(previsionHeight)}
                    height={itemHeight}
                    width={xScale.bandwidth()}
                    fill={stackColors[datum.title].color}
                />
            );
        });

        return <g>{bars}</g>;
    }
}
