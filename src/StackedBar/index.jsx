import React, {Component} from 'react';

import Bar from '../Bar';

export default class StackedBar extends Component {
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
                    fill={stackColors[datum.title].color} />
            );
        });

        return (
            <g>{bars}</g>
        );
    }
}
