import React, {Component} from 'react';

import Bar from '../Bar';

export default class Bars extends Component {
    render() {
        const {scales, margins, data, svgDimensions, isClickable, colorScale} = this.props;
        const {xScale, yScale} = scales;
        const {height} = svgDimensions;

        const bars = (
            data.map(datum =>
                <Bar
                    key={datum.title}
                    x={xScale(datum.title)}
                    y={yScale(datum.value)}
                    datum={datum}
                    isClickable={isClickable}
                    height={height - margins.bottom - scales.yScale(datum.value)}
                    width={xScale.bandwidth()}
                    fill={colorScale(datum.value)} />,
            )
        );

        return (
            <g>{bars}</g>
        );
    }
}
