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
                    titleBar={data.title}
                    key={data.title + datum.title}
                    isClickable={isClickable}
                    datum={datum}
                    tooltipContent={this.props.tooltipContent}
                    x={xScale(data.title)}
                    y={yScale(previsionHeight)}
                    height={itemHeight}
                    width={xScale.bandwidth()}
                    fill={stackColors[datum.title]} />
            );
        });

        return (
            <g>{bars}</g>
        );
    }
}
